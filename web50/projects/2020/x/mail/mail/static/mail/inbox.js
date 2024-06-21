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
        

        if(formId==='compose-form')
          {
            //console.log("trying to compose");
            // You can now use formId to identify which form was submitted
            console.log('Form with ID ' + formId + ' was submitted');
            const recipients = document.querySelector('#compose-recipients').value;
            const subject = document.querySelector('#compose-subject').value;
            const body = document.querySelector('#compose-body').value;

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
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

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
              console.log('This element has been clicked!')
              });
              document.querySelector('#emails-view').append(mailitem);

            })
        });
    }
}