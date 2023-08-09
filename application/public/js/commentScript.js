
const commentsList = document.getElementById('commentsList');
const commentButton = document.getElementById('commentButton');
const commentInput = document.getElementById('commentInput');

if(commentButton){
	commentButton.addEventListener('click', function(ev){

		const commentText = commentInput.value;
		const postId = ev.currentTarget.dataset.postid;


		const payload = {
			postId,
			commentText
		}

		const fetchOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(payload)
		}

		fetch('/comments/create', fetchOptions)
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data);
				if(data.statusCode < 0){
					window.location.replace(data.redirectTo);
				} else {
					var htmlString = "";
					htmlString = buildCommentDiv(data);
					commentsList.innerHTML += htmlString;
					commentInput.value = "";
					window.location.replace(`#message-${data.commentId}`)
				}
			})
			.catch(error => console.error(error))
	})
}


function buildCommentDiv(data){
	const dateString = new Date().toLocaleString("en-us", {
		timeStyle: "medium",
		dateStyle: "medium"
	});

	console.log(dateString);

	return `<div class="commentMeta" id = "message-${data.commentId}">
	<a href="/users/profile/${data.userId}"><img
                  class="navProfileImg"
                  src="https://api.multiavatar.com/${data.username}.png"
                  alt=""
                /></a>
	<div class="usernameAndComment">
	  <p class="commentUsername">@${data.username} <span>${dateString}</span></p>
	  <p class="comment">${data.commentText}</p>
	</div>
  </div>`
}