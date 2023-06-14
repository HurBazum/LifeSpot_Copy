using System.IO;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace LifeSpot
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            string footerHtml = File.
                ReadAllText(Path.
                Combine(Directory.
                GetCurrentDirectory(), "Views", "Shared", "Footer.html"));
            string sideBarHtml = File.
                ReadAllText(Path.
                Combine(Directory.
                GetCurrentDirectory(), "Views", "Shared", "SideBar.html"));

            //app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async context =>
                {
                    var viewPath = Path.Combine(Directory
                        .GetCurrentDirectory(), "Views", "Index.html");
                    var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                       .Replace("<!--SIDEBAR-->", sideBarHtml)
                       .Replace("<!--FOOTER-->", footerHtml);
                    await context.Response.WriteAsync(html.ToString());
                });
                endpoints.MapGet("/Testing.html", async context =>
                {
                    var testPath = Path.Combine
                    (Directory.GetCurrentDirectory(), "Views", "Testing.html");
                    var html = new StringBuilder(await File.ReadAllTextAsync(testPath))
                       .Replace("<!--SIDEBAR-->", sideBarHtml)
                       .Replace("<!--FOOTER-->", footerHtml);
                    await context.Response.WriteAsync(html.ToString());
                });
                endpoints.Map("/Static/CSS/Index.css", async context => 
                { 
                    var cssPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "CSS", "Index.css");
                    var css = await File.ReadAllTextAsync(cssPath);
                    await context.Response.WriteAsync(css);
                });
                endpoints.MapGet("/Static/JS/Index.js", async context =>
                {
                    var jsPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "JS", "Index.js");
                    var js = await File.ReadAllTextAsync(jsPath);
                    await context.Response.WriteAsync(js);
                });
                endpoints.MapGet("/Static/JS/TestScript.js", async context =>
                {
                    var jsPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "JS", "TestScript.js");
                    var js = await File.ReadAllTextAsync(jsPath);
                    await context.Response.WriteAsync(js);
                });
                endpoints.MapGet("/Static/JS/InputScript.js", async context =>
                {
                    var jsPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "JS", "InputScript.js");
                    var js = await File.ReadAllTextAsync(jsPath);
                    await context.Response.WriteAsync(js);
                });
            });
        }
    }
}