using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Builder;
using System.Runtime.CompilerServices;
using System.IO;
using Microsoft.AspNetCore.Http;
using System.Net;
using System.Text;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.ViewEngines;

namespace LifeSpot
{
    public static class EndpointsMapper
    {
        public static void MapCss(this IEndpointRouteBuilder builder)
        {
            var cssFiles = new[] { "Index.css" };

            foreach(var item  in cssFiles)
            {
                builder.MapGet($"/Static/CSS/{item}", async context =>
                {
                    var cssPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "CSS", item);
                    var css = await File.ReadAllTextAsync(cssPath);
                    await context.Response.WriteAsync(css);
                });
            }
        }

        public static void MapJs(this IEndpointRouteBuilder builder)
        {
            var jsFiles = new[] { "Index.js", "TestScript.js", "Feedback.js", "Slide.js" };

            foreach(var item in jsFiles)
            {
                builder.MapGet($"/Static/JS/{item}", async context =>
                {
                    var jsPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "JS", item);
                    var js = await File.ReadAllTextAsync(jsPath);
                    await context.Response.WriteAsync(js);
                });
            }
        }

        public static void MapHtml(this IEndpointRouteBuilder builder)
        {
            string footerHtml = File
                .ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "Footer.html"));
            string sideBarHtml = File
                .ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "SideBar.html"));
            string videoContentHtml = File
                .ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "VideoContent.html"));
            string aboutContent = File
                .ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "AboutContent.html"));
            string testingContent = File
                .ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "TestingContent.html"));

            var htmlFiles = new Dictionary<string, string[]> {
                { "Index.html", new[] { sideBarHtml, videoContentHtml, footerHtml } },
                { "About.html", new[] { sideBarHtml, aboutContent, footerHtml } },
                { "Testing.html", new[] { sideBarHtml, testingContent, footerHtml } }
            };

            foreach(var item in htmlFiles)
            {
                string pattern = (item.Key == "Index.html") ? "/" : $"/{item.Key}";

                builder.MapGet(pattern, async context =>
                {
                    var viewPath = Path.Combine(Directory
                        .GetCurrentDirectory(), "Views", item.Key);
                    var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                       .Replace("<!--SIDEBAR-->", item.Value[0])
                       .Replace("<!--CONTENT-->", item.Value[1])
                       .Replace("<!--FOOTER-->", item.Value[2]);
                    await context.Response.WriteAsync(html.ToString());
                });
            }
        }

        public static void MapPicture(this IEndpointRouteBuilder builder)
        {
            var pictureFiles = new[] { "london.jpg", "ny.jpg", "spb.jpg", "tokyoCut.jpg" };

            foreach(var item in pictureFiles)
            {
                builder.MapGet($"/Static/SlidePictures/{item}", async context =>
                {
                    var picturePath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "SlidePictures", item);
                    var s = await File.ReadAllBytesAsync(picturePath);
                    await context.Response.Body.WriteAsync(s);
                });
            }
        }
    }
}