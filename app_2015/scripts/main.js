(function () {
  'use strict';

  var querySelector = document.querySelector.bind(document);

  var navdrawerContainer = querySelector('.navdrawer-container');
  var body = document.body;
  var appbarElement = querySelector('.app-bar');
  var menuBtn = querySelector('.menu');
  var main = querySelector('main');

  function closeMenu() {
    body.classList.remove('open');
    appbarElement.classList.remove('open');
    navdrawerContainer.classList.remove('open');
  }

  function toggleMenu() {
    body.classList.toggle('open');
    appbarElement.classList.toggle('open');
    navdrawerContainer.classList.toggle('open');
    navdrawerContainer.classList.add('opened');
  }

  main.addEventListener('click', closeMenu);
  menuBtn.addEventListener('click', toggleMenu);
  navdrawerContainer.addEventListener('click', function (event) {
    if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') {
      closeMenu();
    }
  });

  var step = 0;
  $('.next').click(function(){
    if (step === 0) {
      var prenom = $('#first_name').val();
      var nom = $('#last_name').val();
      var username =  $('#username').val();
      var trinome =  $('#trinome').val();
      var classID =  $('#class').val();
      var dateTP = $('input[name=dateTP]:checked').val();

      if( !prenom || !username || !classID || !nom || !trinome || !dateTP)
      {
        alert('Merci de remplir tout les champs !');
      }
      step++;
      $('#step1').hide();
      $('#step2').show();
      return false;
    } else if (step === 1) {
      $.ajax({
        url:'/questionnaire',
        type:'post',
        data:$('#formDayOne').serialize(),
        success: function(){
          alert("worked")
        }
      });
      $('#step2').hide();
      $('#step3').show();
    }
    return false;
  });

  var now = new Date();
  //if( now.getDate() === 7 )
  //  $('#questionnaire').show();
})();
