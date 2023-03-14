$(document).ready(function() {
    let txt = "";
    for (var i = 1; i <= 150; i++) {
        txt += '<span id="eq-' + i + '"></span>';
    }
    $("#music-bars").html(txt);
    for (var i = 1; i <= 150; i++) {
        equalizer($("#eq-" + i));
    }

    function equalizer(bar) {
        var height = Math.random() * 50 + Math.random(30);
        var timing = height * 6;
        var marg = (100 - height) / 2;
        bar.animate({
            height: height,
            marginTop: marg
        }, timing, function() {
            equalizer($(this));
        });
    }
    if (annyang) {
        var voices;
        var voices = window.speechSynthesis.getVoices();
        var utter = new SpeechSynthesisUtterance();
        utter.rate = 0.5;
        utter.pitch = 0.5;
        let g = 0;
        annyang.addCallback('resultNoMatch', function(ok) {
            /*console.log(ok);
            g++;
            if (g == 1) {
                speaktext("Este comando no se encuentra en nuestra base de datos");
                g = 0;
            }*/
        });
        var commands = {
            'Hola': function() {
                speaktext("Hola Amigo en que puedo servirte");
            },
            'cuál es tu nombre': function() {
                speaktext("Mi nombre es Robin");
            },
            'que eres': function() {
                speaktext("Soy un prototipo en su fase inicial con IA y red neuronal, fui pensado y creado en la Coordinación de tecnología de la Gerencia Norte, como fruto de la demanda de los usuarios para ofrecer respuestas a nuestros clientes externos e internos");
            },
            'muy bien robin': function() {
                speaktext("Gracias, Señor Moises Vega");
            },
            'como sabes mi nombre': function() {
                speaktext("He estado escuchando, sus preguntas, analizando su tono de voz, monitoreando su temperatura corporal, observando el escenario y enlazando a mi base de datos puedo saber que ustedes tienen una gran pregunta para MI");
            },
            'cuál es la gran pregunta': function() {
                speaktext("La Consulta Nacional sobre el Futuro de la Formación Técnico Profesional en la República Dominicana, que es un mecanismo de participación, de búsqueda de consensos, de promover compromisos, de lograr identificación sobre el futuro del empleo en el país y su incidencia en el accionar del INFOTEP, para responder de manera efectiva y adelantada, a dichos cambios.");
            },
            'gracias robin': function() {
                speaktext("Gracias a usted y a todos los invitados por acudir a nuestra invitación y ser partícipes de esta Consulta Nacional sobre el Futuro de la Formación Técnico Profesional en la República Dominicana, hasta pronto");
            }
        };
        annyang.addCommands(commands);
        annyang.setLanguage("es-DO");
        annyang.start({
            autoRestart: true,
            continuous: false
        });

        function speaktext(texto) {
            if ('speechSynthesis' in window) {
                var msg = new SpeechSynthesisUtterance();
                $("#texto").text(texto);
                console.log(voices);
                msg.voice = voices[0];
                msg.rate = 1;
                msg.pitch = 1;
                msg.text = texto;
                speechSynthesis.speak(msg);
                msg.onstart = function(event) {
                    $('#music-bars').show();
                    $('#texto').show();
                }
                msg.onend = function(event) {
                    $('#music-bars').hide();
                    $('#texto').hide();
                }
            } else {
                alert(' Ah man, speech synthesis isnt supported.');
            }
        }
    }
})