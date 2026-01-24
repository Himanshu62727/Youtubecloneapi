const search = document.querySelector('.search-bar');
const btn = document.querySelector('.search-btn');
const output = document.querySelector('.output');
const signupModal = document.getElementById("signup-modal");
const closeModal = document.querySelector(".close");
const registerBtn = document.getElementById("register-btn");
const loader = document.getElementById('loader');

async function youtubeData() {
    const searchQuery = search.value;
    const apiKey = "AIzaSyD9NZ1estPeq_RfjEPiyMwqykH2ioZcB2k";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=100&q=${searchQuery}&key=${apiKey}`;

    try {
        const data = await fetch(url);
        const res = await data.json();
        console.log(res);

        output.innerHTML = '';

        res.items.forEach(item => {
            output.innerHTML += `
                <div style="margin: 20px; border: 1px solid black; padding: 10px; border-radius: 15px;">
                    <iframe width="100%" 
                        height="200" 
                        src="https://www.youtube.com/embed/${item.id.videoId}"
                        frameborder="0" allowfullscreen>
                    </iframe>
                    <h3>${item.snippet.title}</h3>
                    <p>${item.snippet.channelTitle}</p>
                    <p>${item.snippet.description}</p>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error fetching YouTube data:", error);
    }
}

btn.addEventListener('click', () => {
    setTimeout(() => {
        if (search.value.trim() === "") {
            alert("Please enter a search term.");
            return;
        }
        youtubeData();
    }, 500);
});


// Close modal
closeModal.addEventListener("click", () => {
    signupModal.style.display = "none";
});

// Display stored user
window.addEventListener("load", () => {
    const user = JSON.parse(localStorage.getItem("youtubeUser"));
    if (user) {
        document.querySelector(".user-icon").title = user.name;
    }
});