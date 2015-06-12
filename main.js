$(document).ready(function () {
  page.init();
});


var page = {
  url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat",
  yourUsername: "",
  yourImage: "",
  selectedImage: "",


  init: function (arguments) {
    page.initStyling();
    page.initEvents();
  },

  initStyling: function (arguments) {

    page.loadMessages();

  },

  initEvents: function () {

    $('.content').on('click', '.delete', page.deleteMessage);
    $('.sendButton').on('click', page.addMessage);
    $('.newUser').on('click', page.createLogin);
    $('.returnUser').on('click', page.userLogin);
    $('.userCreate').on('click', page.createAccount);
    $('.userSubmit').on('click', page.loginAccount);
    $('.pickImage').on('click', 'input[type=radio]', page.selectImage);

    $('.content').on('click', '.editMessage', function (e) {
      e.preventDefault();
      $(this).next().toggleClass('active');
    });

    $('.content').on('click', '.submitEdit', function (e) {
      e.preventDefault();
      var $thisEditing = $(this).closest('.editing');
      var messageId = $(this).closest('article').data('id');
      var updatedMessage = {
        message: $thisEditing.find('.editMessage').val(),
      };
      console.log("the updated message:",updatedMessage)
      page.updateMessage(updatedMessage, messageId);


    });

},
    selectImage: function(e){
      page.selectedImage= $(this).attr('value');
      // console.log("you selected an image ", page.selectedImage);

    },
    userLogin: function(e){
      e.preventDefault();
      console.log("this is an existing user");
      $(".feedbackMessage").removeClass('active');
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
      $(".feedbackMessage").removeClass('active');
      $('.returnUser').addClass('active');
      $('.newUser').removeClass('active');
      $('.verifyPassword').addClass('active');
      $('.pickImage').addClass('active');
      $('.userCreate').addClass('active');
      $('.userSubmit').removeClass('active');
    },

    loginAccount: function(){
      $(".feedbackMessage").removeClass('active');
    var username= $('.userName').val();
    var password= $('.password').val();
    console.log("username: ", username);
    console.log("password: ", password);
    if(username !== "" && password !== ""){
          $.ajax({
              url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat/557b32324ef0f403000002a7",
              method: 'GET',
              success: function (data) {
                      console.log("this is the login data: ", data);
                      _.each(data, function(e, i){
                        if(i === username){
                          console.log("this is the info: ", e);

                            if(e.pass === password){
                                    console.log("you selected the correct password");
                                    if(e.isOnline === "true"){
                                      $(".feedbackMessage").addClass('active');
                                      $('#response').text('User is Already Logged On');
                                    }
                                    else{
                                      console.log("logOn");
                                      page.yourUsername= username;
                                      console.log("this is your username: ", page.yourUsername);
                                      page.yourImage= e.image;
                                      console.log("this is your image: ", page.yourImage);
                                    }
                                }
                            else{
                              console.log("you used this password: ", password);
                              $(".feedbackMessage").addClass('active');
                              $('#response').text('Incorrect Password');
                            }
                              }
                        });
                },
              error: function (err) {

              }
        });
    }
    else if(username !=="" && password == ""){
      // console.log("please enter password");
      $(".feedbackMessage").addClass('active');
      $('#response').text('Please Enter Password');
    }
    else if(username =="" && password !== ""){
      console.log("please enter username");
      $(".feedbackMessage").addClass('active');
      $('#response').text('Please Enter Username');
    }
    else{ //if button is pressed but nothing was entered it will do nothing
      console.log("please enter user name and password");
    }
  },


  createAccount: function(e){
    console.log("decided to create account");
    console.log($('.userName').val());
    var password= $('.password').val();
    var vPassword= $('.verifyPassword').val();
    console.log(page.selectedImage);
    if(password !== vPassword){
      console.log("password does not match");
    }
    else{
            var userAccount = $('.userName').val();
            var user = {
                isOnline: true,
                pass: password,
                image: page.selectedImage
            };
            var objectToSend = {};
            objectToSend[userAccount] = user;
      $.ajax({
             url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat/557b32324ef0f403000002a7",
             method: 'PUT',
             data: objectToSend,
             success: function (data) {
               console.log("success!!: ", data);
               page.yourUsername= userAccount;
               page.yourImage= page.selectedImage;
               console.log("these are set for the page: ", page.yourUsername + page.yourImage);
             },
             error: function (err) {
               console.log("error ", err);
             }
      });
    }
  },
  addOne: function (message) {
    page.loadTemplate("message", message, $('.chat > .content'));
    console.log("one message to the dom:",message);
  },
  addAll: function (messageCollection) {
    _.each(messageCollection, page.addOne);
    console.log("message collection:",messageCollection)
  },

  loadMessages: function () {

    $.ajax({
      url: page.url,
      method: 'GET',
      success: function (data) {
        console.log("load messages data:",data);
        page.addAll(data);
      },
      error: function (err) {
        console.log("error on load messages:", err);
      }
    });


},
  createMessage: function (newMessage) {

    $.ajax({
      url: page.url,
      method: 'POST',
      data: newMessage,
      success: function (data) {

        page.addOne(data);
        console.log("on success create a message: ", data);
      },
      error: function (err) {
        console.log("error on create message:", err);
      }
    });

  },
  updateMessage: function (editedMessage, messageId) {

    $.ajax({
      url: page.url + '/' + messageId,
      method: 'PUT',
      data: editedMessage,
      success: function (data) {
        $('.content').html('');
        page.loadMessages();

      },
      error: function (err) {}
    });
  },
  deleteMessage: function(e) {
    e.preventDefault();

    $.ajax({
      url: page.url + "/" + $(this).closest('article').data('id'),
      method: 'DELETE',
      success: function (data) {
        console.log("this:",this);
        $('.content').html('');
        page.loadMessages();

      }
    });
  },

  addMessage: function (event) {
    event.preventDefault();

    var newMessage = {
      message: $('input[name="message"]').val(),

    };
    page.createMessage(newMessage);

    $('input, textarea').val("");
  },


  loadTemplate: function (tmplName, data, $target) {
    var compiledTmpl = _.template(page.getTemplate(tmplName));

    $target.append(compiledTmpl(data));
  },


  getTemplate: function (name) {
    return templates[name];
  }

};

/////////////////////////////////////////////////////////////////////////////////
// Used the below code to create the first user account and have a static _id for user accounts
// This user _id to access user account information is "_id": "5579f02d998fae0300000185"
// $.ajax({
//       url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat/557b32324ef0f403000002a7" ,
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
