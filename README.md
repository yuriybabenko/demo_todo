Requirements
=====

 - I can have my todo list displayed.
 - I can manipulate my list (add/remove/modify entries).
 - Assign priorities and due dates to the entries.
 - I can sort my entry lists using due date and priority.
 - I can mark an entry as completed.
 - Minimal UI/UX design is needed.
 - I need every client operation done using JavaScript, reloading the page is
 not an option.
 - Write a RESTful API which will allow a third-party application to trigger actions on your app (same actions available on the webpage).
 - You need to be able to pass credentials to both the webpage and the API.
 - As complementary to the last item, one should be able to create users in the system via an interface,
   probably a signup/register screen.

Implementation
=====

The project is powered by AngularJS on the front-end, and Laravel 4 & MySQL on the back-end. The front- & back-ends are completely decoupled and interact solely through the API.

The AngularJS front-end is served from the site.com/ domain root, while the back-end is served from site.com/ws/ (web service).

Setup
=====

Import the database, and configure the Laravel application as you would normally:

- ensure app/storage is writable by your web server
- update bootstrap/start.php to detect your environment
- update app/config/app.php and app/config/database.php as necessary
- ensure public/.htaccess contains `RewriteBase /ws` after `RewriteEngine On`

Then configure the vhost with:

    <VirtualHost *:80>
      DocumentRoot /todo/app/frontend
      ServerName demo.todo
      DirectoryIndex index.html index.php
      
      <Directory /todo/app/frontend>
        Options FollowSymLinks MultiViews
        AllowOverride All
        Order allow,deny
        allow from all
        RewriteEngine on
      </Directory>

      alias /ws "/todo/app/laravel/public"
      <Directory "/todo/app/laravel/public">
        Options FollowSymLinks MultiViews
        AllowOverride All
        Order allow,deny
        allow from all
        RewriteEngine on
      </Directory>
    </VirtualHost>

In the above vhost configuration:

- ensure `DocumentRoot`, both `Directory` directives and the `alias` all have proper, absolute paths
- ensure the `alias` (ie. `/ws`) matches the `RewriteBase` in Laravel's public/.htaccess

Finally, update your system's `hosts` file to serve the domain specified in `ServerName`.