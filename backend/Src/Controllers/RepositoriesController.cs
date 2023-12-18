using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Src.DTOs;
using Octokit;
using DotNetEnv;

namespace backend.Src.Controllers


{
    [ApiController]
    [Route("[controller]")] 
    public class RepositoriesController : ControllerBase
    {
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RepositoryDto>?>> GetAll()
        {
            var client = ClientProvider();
            
            var response = await GetAllRepositories(client);
            return Ok(response);
        }

        private GitHubClient ClientProvider()
        {
            
            var client = new GitHubClient(new ProductHeaderValue("MobileHub"));
            var myToken = Env.GetString("GITHUB_ACCESS_TOKEN");
            var tokenCred = new Credentials(myToken);
            client.Credentials = tokenCred;
            return client;
        }

        private async Task<IReadOnlyList<RepositoryDto>?> GetAllRepositories(GitHubClient client)
        {
            var repositories = await client.Repository.GetAllForUser("Dizkm8");

             repositories = repositories.OrderByDescending(x => x.UpdatedAt).ToList();

             var getCommitsTasks = repositories.Select(r => GetCommitsAmountByRepository(client, r.Name));

             var commitsResults = await Task.WhenAll(getCommitsTasks);

            var mappedRepositories = repositories.Select((r, index) =>
            {
                var entity = new RepositoryDto
                {
                    Name = r.Name,
                    CreatedAt = r.CreatedAt,
                    UpdatedAt = r.UpdatedAt,
                    CommitsAmount = commitsResults[index]
                };
                return entity;
            }).ToList();

            return mappedRepositories;
        }

        [HttpGet("{repositoryName}")]
        public async Task<ActionResult<IEnumerable<GitHubCommit>?>> GetAllCommits(string repositoryName)
        {
            var client = ClientProvider();
            var response = await GetAllCommitsByRepository(client, repositoryName);
            return Ok(response);
        }

        private async Task<int> GetCommitsAmountByRepository(GitHubClient client, string repoName)
        {
            var commits = await client.Repository.Commit.GetAll("Dizkm8", repoName);
            if (commits is null) return 0;

            return commits.Count;
              
        }

        private async Task<IReadOnlyList<CommitDto>?> GetAllCommitsByRepository(GitHubClient client, string repositoryName)
        {

            var commits = await client.Repository.Commit.GetAll("Dizkm8", repositoryName);

            var mappedCommits = commits.Select((r) =>
            {
                var entity = new CommitDto
                {
                    Author = r.Author.Login,
                    Message = r.Commit.Message,
                    Date = r.Commit.Author.Date
                };
                return entity;
            }).ToList();

            return mappedCommits;
        }

        
    }
}