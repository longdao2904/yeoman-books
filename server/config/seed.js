/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Publisher = require('../api/publisher/publisher.model');
var Book = require('../api/book/book.model');


// Get Publisher ID of Publisher reference for Book data
function seedBook(bookName, author, description, isbn, publishedDate, numberOfPages, publisherName) {
  Publisher.findOne({ name: publisherName }).exec()
      .then(function (publisher) {
        return Book.create({
          name: bookName,
          author: author,
          description: description,
          isbn: isbn,
          publishedDate: publishedDate,
          numberOfPages: numberOfPages,
          publisher: publisher._id
        });
      });
}

Thing.find({}).remove(function () {
  Thing.create({
    name: 'MEAN stack - Real-time update',
    info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name: 'MEAN stack - Authentication boilerplate',
    info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name: 'MEAN stack - oAuth integrations',
    info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  }, {
    name: 'MEAN stack - Socket.io integration',
    info: 'Best practice client and server structures allow for more code reusability and maximum scalability'
  }, {
    name: 'MEAN stack - Grunt task runner',
    info: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  }, {
    name: 'MEAN stack - Yeoman generator',
    info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

// Seed data for Users
User.find({}).remove(function () {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    name: 'Peter',
    email: 'longdb2904@gmail.com',
    password: 'peter'
  }, {
    provider: 'local',
    name: 'Kraken',
    email: 'kraken@gmail.com',
    password: 'kraken'
  }, {
    provider: 'local',
    role: 'Admin',
    name: 'Administrator',
    email: 'admin@admin.com',
    password: 'admin'
  }, function () {
    console.log('Finished populating users');
  }
      );
});

// Seed data for Publishers
Publisher.find({}).remove(function () {
  Publisher.create(
      { "name": "Microsoft Press", },
      { "name": "Reed Elsevier" },
      { "name": "Thomson-Reuters" },
      { "name": "Wolters Kluwer" },
      { "name": "Random House" },
      { "name": "Hachette Livre" },
      { "name": "Holtzbrinck" },
      { "name": "Grupo Planeta" },
      { "name": "McGraw-Hill Education" },
      { "name": "Packt Publishing Ltd" },
      { "name": "Apress" },
      { "name": "Wiley" },
      { "name": "O'Reilly Media" },
      { "name": "Addison-Wesley Professional" },
      function () {
        console.log('Finished populating Publishers');
      });
  // Seed data for Books with embed Publisher reference
  Book.find({}).remove(function () {
    seedBook("Creating Mobile Apps with Xamarin.Forms Preview Edition 2",
        "Charles Petzold",
        "Mobile - Microsoft",
        "9780735697379",
        "2015-04-11",
        400,
        "Microsoft Press");

    seedBook("MEAN Web Development",
        "Amos Q. Haviv",
        "MongoDB - ExpressJS - AngularJS - NodeJS",
        "9781783983292",
        "2014-09-25",
        354,
        "Reed Elsevier");

    seedBook("Pro AngularJS (Expert's Voice in Web Development)",
        "Adam Freeman",
        "1430264489",
        "2014-03-26",
        100,
        "Thomson-Reuters");

    seedBook("Web Design with HTML, CSS, JavaScript and jQuery Set",
        "Jon Duckett",
        "First published in 1818, Persuasion was Jane Austen's last work.",
        "1118907442",
        "2014-07-08",
        200,
        "Wolters Kluwer");

    seedBook("Practical Node.js: Building Real-World Scalable Web Apps",
        "Azat Mardan",
        "With all the forces of the world conspiring to keep Mr. Darcy and Elizabeth Bennet apart",
        "1430265957",
        "2014-07-10",
        300,
        "Random House");

    seedBook("MongoDB: The Definitive Guide",
        "Kristina",
        "Manage the huMONGOus amount of data collected through your web application with MongoDB",
        "1449344682",
        "2013-05-26",
        432,
        "Hachette Livre");

    seedBook("Node.js, MongoDB, and AngularJS Web Development (Developer's Library)",
        "Brad Dayley",
        "The definitive guide to building JavaScript-based Web applications from server to browser.",
        "0321995783",
        "2014-08-26",
        696,
        "Holtzbrinck");

    seedBook("A Smarter Way to Learn JavaScript: The new approach that uses technology to cut your effort in half",
        "Mark Myers",
        "Written for beginners, useful for experienced developers who want to sharpen their skills and don't mind covering some ground they already know",
        "1497408180",
        "2014-03-20",
        254,
        "Grupo Planeta");

    seedBook("AngularJS Web Application Development Cookbook",
        "Matt Frisbie",
        "Over 90 hands-on recipes to architect performant applications and implement best practices in AngularJS.",
        "1783283351",
        "2015-01-26",
        319,
        "McGraw-Hill Education");

    seedBook("Professional AngularJS",
        "Valeri Karpov",
        "Most of the existing guides to AngularJS struggle to provide simple and understandable explanations for more advanced concepts.",
        "1118832078",
        "2015-05-04",
        408,
        "Packt Publishing Ltd");

    seedBook("Getting MEAN with Mongo, Express, Angular, and Node",
        "Simon Holmes",
        "Traditional web dev stacks can require different programming languages for every layer, creating a complex mashup of code and frameworks. Together, the MongoDB database, the Express and AngularJS web application frameworks, and Node.js on the server-side constitute the MEAN stack, a powerful web development platform that uses JavaScript top to bottom.",
        "1617292036",
        "2015-07-01",
        408,
        "O'Reilly Media");
    console.log('Finished populating Books');
  });
});