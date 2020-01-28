$(function(){
  let last_message_id = $('.main_chat__message-list__box:last').data("message-id");
    var buildHTML = function(message) {
      if (message.content && message.image) {
        var html =`<div class="main_chat__message-list__box" data-message-id=` + message.id + `>` +
          `<div class="main_chat__message-list__box__date">` +
            `<div class="main_chat__message-list__box__date__name">` +
              message.user_name +
            `</div>` +
            `<div class="main_chat__message-list__box__date__time">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="main_chat__message-list__box__message">` +
            `<p class="main_chat__message-list__box__message__text">` +
              message.content +
            `</p>` +
            `<img src="` + message.image + `"class="main_chat__message-list__box__message__image" >` +
          `</div>` +
        `</div>`
      } else if (message.content) {
        var html = `<div class="main_chat__message-list__box" data-message-id=` + message.id + `>` +
          `<div class="main_chat__message-list__box__date">` +
            `<div class="main_chat__message-list__box__date">` +  
              message.user_name +
            `</div>` +
            `<div class="main_chat__message-list__box__date__time">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="main_chat__message-list__box__message">` +
            `<p class="main_chat__message-list__box__message__text">` +
              message.content +
            `</p>` +
          `</div>` +
        `</div>`
      } else if (message.image) {
        var html = `<div class="main_chat__message-list__box" data-message-id=` + message.id + `>` +
          `<div class="main_chat__message-list__box__date">` +
            `<div class="main_chat__message-list__box__date">` +  
              message.user_name +
            `</div>` +
            `<div class="main_chat__message-list__box__date__time">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="main_chat__message-list__box__message">` +
          `<img src="` + message.image + `" class="class="main_chat__message-list__box__message__image" >` +
        `</div>` +
      `</div>`
      };
      return html;
    };

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
    .done(function(message){
      var html = buildHTML(message);
      $('.main_chat__message-list').append(html);      
      $('.main_chat__message-form__mpform')[0].reset();
      $(".main_chat__message-form__mpform__btn").prop("disabled", false);
      $('.main_chat__message-list').animate({ scrollTop: $('.main_chat__message-list')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })


  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.main_chat__message-list__box:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.main_chat__message-list').append(insertHTML);      
        $('.main_chat__message-form__mpform')[0].reset();
        $(".main_chat__message-form__mpform__btn").prop("disabled", false);
        $('.main_chat__message-list').animate({ scrollTop: $('.main_chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 2000);
  }
});