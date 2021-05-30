using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RequestProject.Contracts;
using RequestProject.Models;
using RequestProject.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using Microsoft.Owin;
//using Owin;
//using Microsoft.IdentityModel.Protocols.OpenIdConnect;
//using Microsoft.IdentityModel.Tokens;
//using Microsoft.Owin.Security;
//using Microsoft.Owin.Security.Cookies;
//using Microsoft.Owin.Security.OpenIdConnect;
//using Microsoft.Owin.Security.Notifications;

namespace RequestProject
{
    public class Startup
    {
        string clientId = "3e413463-f2c9-4722-9444-e6201ecf0992";
        string redirectUri = "https://localhost:44346/";
        static string tenant = "780e6184-dbb1-4fe4-8854-de21738e906e";
        string authority = "https://login.microsoftonline.com/780e6184-dbb1-4fe4-8854-de21738e906e/oauth2/v2.0";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            string connection = Configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<ApplicationContext>(options =>
                options.UseSqlServer(connection));

            services.AddControllersWithViews();

            services.AddTransient<IServiceService, ServiceService>();
            services.AddTransient<IEmployeeService, EmployeeService>();
            services.AddTransient<IRequestService, RequestService>();

            services.AddTransient<IStorageContext, ApplicationContext>();
        }

        //public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IAppBuilder appBuilder)
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)

        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });

            //appBuilder.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);

            //appBuilder.UseCookieAuthentication(new CookieAuthenticationOptions());
            //appBuilder.UseOpenIdConnectAuthentication(
            //    new OpenIdConnectAuthenticationOptions
            //    {
            //    ClientId = clientId,
            //        Authority = authority,
            //        RedirectUri = redirectUri,
            //        PostLogoutRedirectUri = redirectUri,
            //        Scope = OpenIdConnectScope.OpenIdProfile,
                
            //    ResponseType = OpenIdConnectResponseType.CodeIdToken,
               
            //    TokenValidationParameters = new TokenValidationParameters()
            //        {
            //            ValidateIssuer = false
            //    },
               
            //    Notifications = new OpenIdConnectAuthenticationNotifications
            //        {
            //            AuthenticationFailed = OnAuthenticationFailed
            //        }
            //    }
            //);
        }

        //private Task OnAuthenticationFailed(AuthenticationFailedNotification<OpenIdConnectMessage, OpenIdConnectAuthenticationOptions> context)
        //{
        //    context.HandleResponse();
        //    context.Response.Redirect("/?errormessage=" + context.Exception.Message);
        //    return Task.FromResult(0);
        //}
    }
}
