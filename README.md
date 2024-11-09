Designed an email system that makes API calls to send and receive emails.

Send Mail: When a user submits the email composition form email is send.

Mailbox: When a user visits their Inbox, Sent mailbox, or Archive, the appropriate mailbox is loaded.
If the email is unread, it will appear with a white background. If the email has been read, it will appear with a gray background.

Each email is then rendered in its own box that displays who the email is from, what the subject line is, and the timestamp of the email.

If the email is unread, it appears with a white background. If the email has been read, it appears with a gray background.

View Email: When a user clicks on an email, the user is taken to a view where they see the content of that email.
Application shows the email’s sender, recipients, subject, timestamp, and body.

Once the email has been clicked on, the email is marked as read.

Archive and Unarchive: Allows users to archive and unarchive emails that they have received.

When viewing an Inbox email, the user is presented with a button that lets them archive the email. When viewing an Archived email, the user is presented with a button that lets them unarchive the email.

Reply: Allows users to reply to an email.

When viewing an email, the user is presented with a “Reply” button that lets them reply to the email.
When the user clicks the “Reply” button, they are taken to the email composition form.
Pre-fills the composition form with the recipient field set to whoever sent the original email.
Pre-fills the subject line. If the original email had a subject line of foo, the new subject line will be Re: foo. 
Pre-fills the body of the email with a line like "On Jan 1 2020, 12:00 AM foo@example.com wrote:" followed by the original text of the email.
