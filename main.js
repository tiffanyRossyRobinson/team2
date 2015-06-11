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
    $('.userCreate').on('click', page.createAccount);
    $('.userSubmit').on('click', page.loginAccount);


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

<<<<<<< HEAD
  loadTemplate: function (tmplName, data, $target) {
    var compiledTmpl = _.template(page.getTemplate(tmplName));
=======
  loginAccount: function(){
    var username= $('.userName').val();
    var password= $('.password').val();
    console.log("username: ", username);
    console.log("password: ", password);
    if(username !== "" && password !== ""){
          $.ajax({
              url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat/5579f02d998fae0300000185",
              method: 'GET',
              success: function (data) {
                console.log("this is the login data: ", data);
              },
              error: function (err) {

              }
        });
    }
    else if(username !=="" && password == ""){
      console.log("please enser password");
    }
    else if(username =="" && password !== ""){
      console.log("please enter username");
    }
    else{
      console.log("please enter user name and password");
    }
  },

  createAccount: function(e){
    console.log("decided to create account");
    console.log($('.userName').val());
    console.log($('.image1'));
    var password= $('.password').val();
    var verifyPassword= $('.verifyPassword').val();
    if(password !== verifyPassword){
      console.log("password does not match");
    }
    else{
      console.log(password);
    }

  },

>>>>>>> 4f84053186d6f58f4c50a3cedfcaf32288e93d23

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
