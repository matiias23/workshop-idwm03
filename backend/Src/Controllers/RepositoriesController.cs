using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Octokit;
using DotNetEnv;

namespace backend.Src.Controllers


{
    [ApiController]
    [Route("[controller]")] 
    public class RepositoriesController : ControllerBase
    {
        
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Repository>?>> GetAll()
        {
            var client = ClientProvider();
            
            var response = await GetAllRepositories(client);
            return Ok(response);
        }

        private GitHubClient ClientProvider()
        {
            Env.Load();
            var client = new GitHubClient(new ProductHeaderValue("MobileHub"));
            var myToken = Env.GetString("GITHUB_ACCESS_TOKEN");
            var tokenCred = new Credentials(myToken);
            client.Credentials = tokenCred;
            return client;
        }

        private async Task<IReadOnlyList<Repository>?> GetAllRepositories(GitHubClient client)
        {
            var repositories = await client.Repository.GetAllForUser("Dizkm8");
            repositories = repositories.OrderByDescending(x => x.UpdatedAt).ToList();
            return repositories;
        }

        [HttpGet("commits")]
        public async Task<ActionResult<IReadOnlyList<GitHubCommit>?>> GetAllCommits()
        {
            var client = ClientProvider();
            var response = await GetAllCommitsByRepository(client);
            return Ok(response);
        }

        private async Task<IReadOnlyList<GitHubCommit>?> GetAllCommitsByRepository(GitHubClient client)
        {
            try
            {
                var commits = await client.Repository.Commit.GetAll("Dizkm8", "Hackathon");
                return commits;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener commits: {ex.Message}");
                return null;
            }
        }

        
    }
}