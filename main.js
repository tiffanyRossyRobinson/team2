$(document).ready(function () {
  page.init();
});

url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat",

var page = {

  getTemplate: function (name) {
    return templates[name];
  },

  init: function (arguments) {
    page.initStyling();
    page.initEvents();
  },

  initStyling: function (arguments) {

        messages.forEach(function (el) {
        page.loadTemplate("message", el, $('.oneMessage'));
      });


  },

  initEvents: function () {

    $('.newUser').on('click', page.createLogin);
    $('.returnUser').on('click', page.userLogin);


    userLogin: function(e){
      e.preventDefault();
      console.log("this is an existing user");
      $('.returnUser').removeClass('active');
      $('.newUser').addClass('active');
      $('.verifyPassword').removeClass('active');
      $('.pickImage').removeClass('active');
      $('.userCreate').removeClass('active');
      $('.userSubmit').addClass('active');
    },

    createLogin: function(e){
      e.preventDefault();
      console.log("this is a new user");
      $('.returnUser').addClass('active');
      $('.newUser').removeClass('active');
      $('.verifyPassword').addClass('active');
      $('.pickImage').addClass('active');
      $('.userCreate').addClass('active');
      $('.userSubmit').removeClass('active');
    },



  },

  loadTemplate: function (tmplName, data, $target) {
    var compiledTmpl = _.template(page.getTemplate(tmplName));

    $target.append(compiledTmpl(data));
  }


};


};


/////////////////////////////////////////////////////////////////////////////////
// Used the below code to create the first user account and have a static _id for user accounts
// This user _id to access user account information is "_id": "5579f02d998fae0300000185"
// $.ajax({
//       url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat" ,
//       method: 'POST',
//       data: {trossy: "{true, 'Athena12', 'https://octodex.github.com/images/momtocat.png'}"},
//       success: function (data) {
//         console.log("success!!: ", data);
//       },
//       error: function (err) {
//         console.log("error ", err);
//       }
//     });
///////////////////////////////////////////////////////////////////////////////
