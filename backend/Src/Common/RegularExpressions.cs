using System.Text.RegularExpressions;

namespace backend.Src.Common
{
    public static partial class RegularExpressions
    {   // Expresión regular generada para validar dominios de correo electrónico de la UCN.
        [GeneratedRegex("^([a-zA-Z]+\\.)*ucn\\.cl$", RegexOptions.Compiled)]
        public static partial Regex UCNEmailDomainRegex();
        // Expresión regular generada para validar RUTs (Rol Único Tributario).
        [GeneratedRegex("^([0-9]+-[0-9K])$", RegexOptions.Compiled)]
        public static partial Regex RutRegex();
    }
}