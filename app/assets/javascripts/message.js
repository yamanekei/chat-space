$(function(){
    function buildHTML(message){
      if ( message.image ) {
        var html =
          `<div class="main_chat__message-list__box" data-message-id=${message.id}>
            <div class="main_chat__message-list__box__date">
              <div class="main_chat__message-list__box__date">
                ${message.user_name}
              </div>
              <div class="main_chat__message-list__box__date__time">
                ${message.created_at}
              </div>
            </div>
            <div class="main_chat__message-list__box__message">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
        return html;
      } else {
        var html =
          `<div class="main_chat__message-list__box" data-message-id=${message.id}>
            <div class="main_chat__message-list__box__date">
              <div class="main_chat__message-list__box__date">
                ${message.user_name}
              </div>
              <div class="main_chat__message-list__box__date__time">
                ${message.created_at}
              </div>
            </div>
            <div class="main_chat__message-list__box__message">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
    }
$('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.main_chat__message-list').append(html);      
       $('.main_chat__message-form__mpform')[0].reset();
       $(".main_chat__message-form__mpform__btn").prop("disabled", false);
       $('.main_chat__message-list').animate({ scrollTop: $('.main_chat__message-list')[0].scrollHeight});
     })
     .fail(function() {
      alert("メッセージ送信に失敗しました");
     });
  })
});
