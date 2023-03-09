$('<link>', {href: "https://fonts.cdnfonts.com/css/gotham", rel:"stylesheet"}).appendTo(document.head);

const askmenu = $('<div>', {'class':'askmenu', id:'askdiv'}).appendTo(document.body).hide();
$('<h2>', {text:'Ask Ai'}).appendTo(askmenu);
$('<div>', {class: 'askinput'}).appendTo(askmenu);
$('<input>', {type: 'text', placeholder: 'Enter question here', id: "askinputbox"}).appendTo($('.askinput'))
$('<p>', {id: 'airesponse'}).appendTo(askmenu);
$('<input>', {type: 'submit', value: 'Ask'}).appendTo('.askinput').click(() => {
    gpt3($('#askinputbox')[0].value, (response) =>{
        $('#askinputbox')[0].value = '';
        $('#airesponse')[0].innerText = response;
    });
});

$(document).keyup((event) => {
  if(event.ctrlKey && event.altKey && event.key == 'k') {
    $('.kiosk').toggle();
  } else if (event.ctrlKey && event.altKey && event.key == 'a') {
    $('.askmenu').animate({width: 'toggle', height:'toggle'}, 150);
  }
});


const api_key = "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";

async function gpt3(prompt, callback) {
    $.ajax({
        url: "https://api.openai.com/v1/chat/completions",
        type: "POST",
        beforeSend: (xhr) => {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", "Bearer " + api_key);
        },
        data: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "system", content: "You are an AI chat bot designed to help students answer questions on their tests."}, 
                {role:"user", content: prompt}],
            max_tokens: 1000,
            n: 1,
        }),
        success: (data) => {callback(data.choices[0].message.content)}
    });
}
