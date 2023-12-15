using System.Text.RegularExpressions;

namespace backend.Src.Common
{
    public static partial class RegularExpressions
    {
        [GeneratedRegex("^([a-zA-Z]+\\.)*ucn\\.cl$", RegexOptions.Compiled)]
        public static partial Regex UCNEmailDomainRegex();

        [GeneratedRegex("^([0-9]+-[0-9K])$", RegexOptions.Compiled)]
        public static partial Regex RutRegex();
    }
}