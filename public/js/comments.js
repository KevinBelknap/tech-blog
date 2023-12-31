const commentFormHandler = async function(event) {
    event.preventDefault();
  
    const blogId = document.querySelector('input[name="Blog-id"]').value;
    const body = document.querySelector('textarea[name="comment-body"]').value;
  
    if (body) {
      await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          blogId,
          body
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      document.location.reload();
    }
  };
  
  document
    .querySelector('#new-comment-form')
    .addEventListener('click', commentFormHandler);
  