using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Razor;

namespace Server.Helpers
{
    public class CustomViewLocationExpander : IViewLocationExpander
    {
        public IEnumerable<string> ExpandViewLocations(ViewLocationExpanderContext context, IEnumerable<string> viewLocations)
        {
            return viewLocations.Select(f => f.Replace("/Views/", "/Server/Views/"));
        }

        public void PopulateValues(ViewLocationExpanderContext context)
        {
            
        }
    }
}