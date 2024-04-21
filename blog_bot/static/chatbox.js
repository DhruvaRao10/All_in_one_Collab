class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            fileInput: document.querySelector('#file-upload-input'),

            // socket = new WebSocket(`ws://${window.location.host}/speech-to-text`), 
            micButton: document.querySelector('.chatbox__mic button'),
            transcriptContainer: document.querySelector('#transcript'),
        }
        this.state = false;
        this.messages = [];
        this.chatHistory = []; 
        this.isRecording = false;
        // this.socket = null;
    }


  
    display() {
        const { openButton, chatBox, sendButton , micButton } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))
        sendButton.addEventListener('click', () => this.onSendButton(chatBox))
        micButton.addEventListener('click', () => this.handleMicrophoneButton(chatBox))

        // const fileupload_id =  document.getElementById("actual-btn")

        // fileupload_id.addEventListener("fileUploadStarted", function (e) {
        //     alert('file upload started' + this.value)
        //   });

        //   fileupload_id.addEventListener("fileUploadSuccess", function (e) {
        //     console.log(this.value) // The url of the uploaded file
        //     console.log(e.detail.files) // Array of file details 
        //   });

        //   fileupload_id.addEventListener("fileUploadFailed", function (e) {
        //     console.log(this.value)
        //     console.log(e.detail.error)
        //   });
        
        
        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        });

        // btn.addEventListener( 'click', function () {
    
        //     // Toggle button class active 
        //     this.classList.toggle( 'active' );
            
        //   });
        
        
       
        this.args.fileInput = document.querySelector('#file-upload-input');
        this.args.fileInput.addEventListener('change', () => this.handleFileUpload(chatBox));
    

        //     // event listener for the microphone button
        //  const microphoneButtonContainer = chatBox.querySelector('.chatbox__mic');
        //  const microphoneButton = microphoneButtonContainer.querySelector('button');
        //  microphoneButton.addEventListener('click', () => this.handleMicrophoneButton());
        //  print("mic event success")
    }
  
    toggleState(chatbox) {
        this.state = !this.state;
        if (this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }


    handleMicrophoneButton(chatbox) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                if (!MediaRecorder.isTypeSupported('audio/webm'))
                    return alert('Browser not supported');
    
                const mediaRecorder = new MediaRecorder(stream, {
                    mimeType: 'audio/webm',
                });
    
                const audioChunks = [];
    
                mediaRecorder.addEventListener("dataavailable", event => {
                    audioChunks.push(event.data);
                });
    
                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    const audioData = new FormData();
                    audioData.append('audio', audioBlob, 'audio.webm');
    
                    fetch('/transcribe', {
                        method: 'POST',
                        body: audioData
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.transcription) {
                            const transcribedText = data.transcription;
                            console.log('Transcribed text:', transcribedText);
                            const textField = chatbox.querySelector('input');
                            textField.value = transcribedText;
                       } else {
                            console.error('Error:', data.error);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                });
    
                mediaRecorder.start();
                console.log("Recording started");
    
                // Add a timeout or other condition to stop the recording
                setTimeout(() => {
                    mediaRecorder.stop();
                    console.log("Recording stopped");
                }, 5000); // Stop recording after 5 seconds (adjust as needed)
            })
            .catch(error => {
                console.error("Error accessing the microphone:", error);
            });
    }


     speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
        } else {
            console.error('Speech synthesis is not supported in this browser.');
        }
    }
    
   

    async onSendButton(chatbox) {
        const textField = chatbox.querySelector('input');
        const userInput = textField.value.trim();
        if (userInput !== "") {
            console.log("User input:", userInput);
            let msg1 = { name: "User", message: userInput };

            this.messages.push(msg1);
            this.chatHistory.push(msg1) ;
            
            this.updateChatText(chatbox); // Display the user's message immediately
            textField.value = '';
            // Hardcode the PDF file path here
            // const pdfFilePath = "";
            const waveContainer = chatbox.querySelector('.wave-container');
            const sendButton = this.args.sendButton;

            waveContainer.innerHTML = ''; // Clear the container
            sendButton.style.display = 'none'; // Hide the send button
              
             textField.disabled = true;

            // Add wave animation elements dynamically
            for (let i = 0; i < 10; i++) {
              const wave = document.createElement('div');
              wave.classList.add('wave');
              wave.style.animationDelay = `${i * 0.1}s`; // Adjust the delay for each wave
              waveContainer.appendChild(wave);
            }
        
            const pdfFilePath = "saxenda-epar-product-information_en.pdf";
            console.log("path found")
            const requestData = { message: userInput, pdf_file_path: pdfFilePath } ;

            // if (this.args.fileInput.files.length > 0) {
            //     this.handleFileUpload(chatbox);
            //     console.log("answering queries from uploaded file")
            //     return;
            // }            
            
            try {
                const requestData = { message: userInput, pdf_file_path: pdfFilePath };
                
                const response = await fetch('/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });
                const data = await response.json();
                print(data)
                if (response.ok) {
                    let msg2 = { name: "Sam", message: data.answer };
                    this.messages.push(msg2);
                    this.chatHistory.push(msg2)

                    this.updateChatText(chatbox);
                    textField.value = '';
                    waveContainer.innerHTML = ''; // Remove the wave animation
                    sendButton.style.display = 'block'; // Show the send button again
                        
                        speak(data.answer)

                    } else {
                        console.error('Error:', data.error);
                        waveContainer.innerHTML = ''; // Remove the wave animation
                        sendButton.style.display = 'block'; // Show the send button again


                    }
                } catch (error) {
                    console.error('Error:', error);
                    this.updateChatText(chatbox);     
                    textField.value = '';          
                    waveContainer.innerHTML = '';   
                    sendButton.style.display = 'block'; // Show the send button again

    
                }
                textField.disabled = false;

            }
        }
    
        updateChatText(chatbox) {
            var html = '';
            this.messages.slice().reverse().forEach(function (item, index) {
                if (item.name === "Sam") {
                    html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
                } else {
                    html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
                }
            });
            const chatmessage = chatbox.querySelector('.chatbox__messages');
            chatmessage.innerHTML = html;
        }

    }


    
    const chatbox = new Chatbox();
    chatbox.display(); 


