using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.AspNetCore.SpaServices.Prerendering;
using Microsoft.Extensions.DependencyInjection;
using Server.Rendering;

namespace Server.Extensions
{
    public static class HttpRequestExtensions
    {
        public static RenderRequest AbstractRequestInfo(this HttpRequest request)
        {

            RenderRequest requestSimplified = new RenderRequest();
            requestSimplified.Cookies = request.Cookies;
            requestSimplified.Headers = request.Headers;
            requestSimplified.Host = request.Host;

            return requestSimplified;
        }
        public static async Task<RenderToStringResult> BuildPrerenderAsync(this HttpRequest Request)
        {
            INodeServices nodeServices;
            IHostingEnvironment environment;
            IHttpRequestFeature feature;
            string applicationBasePath;
            string unencodedPathAndQuery;
            string unencodedAbsoluteUrl;

            nodeServices = Request.HttpContext.RequestServices.GetRequiredService<INodeServices>();
            environment = Request.HttpContext.RequestServices.GetRequiredService<IHostingEnvironment>();
            applicationBasePath = environment.ContentRootPath;
            feature = Request.HttpContext.Features.Get<IHttpRequestFeature>();
            unencodedPathAndQuery = feature.RawTarget;
            unencodedAbsoluteUrl = $"{Request.Scheme}://{Request.Host}{unencodedPathAndQuery}";
            // ** TransferData concept **
            // Here we can pass any Custom Data we want !

            // By default we're passing down Cookies, Headers, Host from the Request object here
            TransferData transferData = new TransferData();
            transferData.Request = Request.AbstractRequestInfo();
            transferData.ThisCameFromDotNET = "Hi Angular it's asp.net :)";
            // Add more customData here, add it to the TransferData class

            //Prerender now needs CancellationToken
            System.Threading.CancellationTokenSource cancelSource = new System.Threading.CancellationTokenSource();
            System.Threading.CancellationToken cancelToken = cancelSource.Token;

            return await Prerenderer.RenderToString(
                "/",
                nodeServices,
                cancelToken,
                new JavaScriptModuleExport(applicationBasePath + "/client/dist/server"),
                unencodedAbsoluteUrl,
                unencodedPathAndQuery,
                transferData, // Our simplified Request object & any other CustommData you want to send!
                30000,
                Request.PathBase.ToString()
            );
        }
    }

}