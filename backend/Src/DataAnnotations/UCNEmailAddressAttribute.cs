using System.ComponentModel.DataAnnotations;
using backend.Src.Common;

namespace backend.Src.DataAnnotations
{

    public class UCNEmailAddressAttribute : ValidationAttribute
    {
        public UCNEmailAddressAttribute()
        {}

        public UCNEmailAddressAttribute(Func<string> errorMessageAccessor) : base(errorMessageAccessor)
        {}

        public UCNEmailAddressAttribute(string errorMessage) : base(errorMessage)
        {}

        public override bool IsValid(object? value)
        {
            if(value is not string email) return false;

            var isValidEmail = new EmailAddressAttribute().IsValid(email);
            if(!isValidEmail) return false;

            try{
                var emailDomain = email.Split('@')[1];
                return RegularExpressions.UCNEmailDomainRegex().IsMatch(emailDomain);
            }
            catch(Exception){
                return false;
            }
            return false;
        }
    }
}