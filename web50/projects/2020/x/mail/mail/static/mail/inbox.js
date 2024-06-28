document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  console.log("noah paul jose");


  
      
    
    document.querySelectorAll('form').forEach(function(form) {
      form.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();
        

        console.log('noah');


        // Get the id of the submitted form
        var formId = this.id;
        

        if(formId==='compose-form' || formId==='compose-reply-form')
          {
            //console.log("trying to compose");
            // You can now use formId to identify which form was submitted
            console.log('Form with ID ' + formId + ' was submitted');
            let recipients;
            let subject;
            let body;
            /* const recipients = document.querySelector('#compose-recipients').value;
            const subject = document.querySelector('#compose-subject').value;
            const body = document.querySelector('#compose-body').value; */
            if(formId==='compose-form')
              {
                recipients = document.querySelector('#compose-recipients').value;
                subject = document.querySelector('#compose-subject').value;
                body = document.querySelector('#compose-body').value; 
              }
            else if(formId==='compose-reply-form')
              {
                recipients = document.querySelector('#compose-reply-recipients').value;
                subject = document.querySelector('#compose-reply-subject').value;
                body = document.querySelector('#compose-reply-body').value;  
              }

            console.log(recipients)
            console.log(subject)
            console.log(body)
            //var stat;
              fetch('/emails', {
                method: 'POST',
                body: JSON.stringify({
                    recipients: recipients,
                    subject: subject,
                    body: body
                })
              })
              .then(response => response.json())
              .then(result => {
                  // Print result
                  console.log(result);
                  const stat= JSON.stringify(result);
                  //console.log(stat)
                  if(stat!='{"message":"Email sent successfully."}')
                    {
                      console.log(result)
                      //alert(result["message"]);
                      //alert(JSON.stringify(result["error"]));
                      alert(result["error"]);
                      //console.log(typeof result); 
                      console.log("message not right" + stat);
                    }
                    else {
                      load_mailbox('sent');
                    }
              });

              
              // ... handle the form submission ...
              
            
          }
      });
    });




  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#see-email').style.display = 'none';
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#compose-reply-view').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function compose_reply_email(email) {

  
    


  console.log("request for composing reply recieved");
  console.log(email);
  // Show compose view and hide other views
  document.querySelector('#see-email').style.display = 'none';
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#compose-reply-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-reply-recipients').value = email['sender'];
  //let subject=JSON.stringify(email['subject']);
  let subject=email['subject'];
  if(!subject.startsWith("Re: "))
    {
      subject="Re: "+subject;
    }
  document.querySelector('#compose-reply-subject').value = subject;
  document.querySelector('#compose-reply-body').value = '"On ' + email['timestamp'] +' ' +email['sender']+ ' wrote: ' +email['body']+ '"\n\n';
  document.getElementById('compose-reply-body').focus();
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#see-email').style.display = 'none';
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#compose-reply-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  if(mailbox==="inbox" || mailbox==="sent" || mailbox==="archive")
    {
              fetch('/emails/'+mailbox)
        .then(response => response.json())
        .then(emails => {
            // Print emails
            //console.log(emails);

            // ... do something else with emails ...
            emails.forEach(email => {
              console.log(email);

              const mailitem = document.createElement('div');
              mailitem.className='emailitem';
              console.log(mailbox);
              let content = "test";
               if(mailbox!="sent") {
                if(email['read'])
                  {
                    mailitem.style.background = 'grey';
                  }
                content=email['sender'] + "         " + email['subject']+ "         " + email['timestamp']; }
              else {
                
                content= email['recipients'] + "         " + email['subject']+ "         " + email['timestamp'];
              } 
              mailitem.innerHTML = content;
              mailitem.addEventListener('click', function() {
              console.log('This element has been clicked!:')
              console.log(email['id']);
              loadmail(email['id']);
              });
              document.querySelector('#emails-view').append(mailitem);

            })
        });
    }
}


function loadmail(id)
{
  document.querySelector('#see-email').style.display = 'block';
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#compose-reply-view').style.display = 'none';

      fetch('/emails/'+id)
    .then(response => response.json())
    .then(email => {
        // Print email
        console.log(email);
        const mail= JSON.stringify(email);
        if(mail!='{"error": "Email not found."}')
          {
            
            console.log("email received");
            fetch('/emails/'+id, {
              method: 'PUT',
              body: JSON.stringify({
                  read: true
              })
            })

            document.querySelector('#see-email').innerHTML="";
            const sender = document.createElement('div');
            sender.innerHTML = "Sender: " + email['sender'];
            
            document.querySelector('#see-email').append(sender);

            let recipients = document.createElement('div');
            recipients.innerHTML = "Recipients: " + email['recipients'];
            
            document.querySelector('#see-email').append(recipients); 


            let subject = document.createElement('div');
            subject.innerHTML = "Subject: " + email['subject'];
            
            document.querySelector('#see-email').append(subject); 

            let timestamp = document.createElement('div');
            timestamp.innerHTML = "Timestamp: " + email['timestamp'];
            
            document.querySelector('#see-email').append(timestamp);

            let body = document.createElement('div');
            body.innerHTML = "Body: " + email['body'];
            body.className="body";
            document.querySelector('#see-email').append(body); 

            let archiveStat=email['archived'];
            let archiveStatus;
            if(archiveStat)
              {
                archiveStatus="Unarchive";
              }
              else 
              {
                archiveStatus="Archive";
              }

            const archive = document.createElement('div');
            //archive.className = 'archive-button';
            archive.innerHTML = `<button value=${archiveStatus} id="archive-button" class="archive-button">${archiveStatus}</button>`;
            document.querySelector('#see-email').append(archive); 

            const reply = document.createElement('div');
            reply.innerHTML = `<br><button value=${id} id="reply-button" class="reply-button">Reply</button>`;
            document.querySelector('#see-email').append(reply); 

            document.addEventListener('click', event => {

              // Find what was clicked on
              const element = event.target;
        
              
              if (element.className === 'archive-button') {
                  console.log("Archive button clicked.");
                  
                  if(archiveStat)
                    {
                      archiveStat=false;
                    }
                    else{
                      archiveStat=true;
                    }
                    fetch('/emails/'+id, {
                      method: 'PUT',
                      body: JSON.stringify({
                          archived: archiveStat
                      })
                    });

                    var delayInMilliseconds = 700; 

                    setTimeout(function() {
                      
                      fetch('/emails/'+id)
                      .then(response => response.json())
                      .then(email => {
                          // Print email
                          console.log("email after changing archobve status");
                          console.log(email);
                          let archiveStat=email['archived'];
                          let archiveStatus;
                          if(archiveStat)
                            {
                              archiveStatus="Unarchive";
                            }
                            else 
                            {
                              archiveStatus="Archive";
                            }
                            document.querySelector('#archive-button').value=archiveStatus;
                            document.querySelector('#archive-button').innerHTML=archiveStatus;
                      });
                      load_mailbox('inbox');

                    }, delayInMilliseconds);
                    
                    

              }
              else if(element.className==='reply-button')
                {
                  console.log("Reply button is clicked");
                  compose_reply_email(email);
                }
            });

          }

        // ... do something else with email ...
    });

    
}