// load posts from API
const loadingSpinner = document.getElementById("loading-spinner")

const loadPost = async () => {


    loadingSpinner.classList.remove('hidden')

    const response = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts")
    const data = await response.json();
    // console.log(data.posts);

    const allPost = data.posts

    const post = allPost.forEach(post => {
        // console.log(post);

    })

    displayPosts(allPost,);
}


//  display posts in body

const displayPosts = (posts) => {

    const postContainer = document.getElementById("post-container")

    postContainer.innerHTML = ''

    posts.forEach(singlePost => {

        const myTimeout = setTimeout(loader, 2000)

        function loader() {
            loadingSpinner.classList.add('hidden')
        }


        const div = document.createElement('div')

        div.classList = 'w-full lg:w-[700px] px-8 py-8  border-2 border-gray-300 rounded-xl  bg-[#797DFC1A] mb-12 '

        div.innerHTML = `

                <div class="flex flex-col lg:flex-row p-0">
                    <div class="relative">
                        <div class="lg:w-16 mr-4 rounded-lg">
                            <img class="rounded-lg"
                                src="${singlePost.image}" alt="">

                            <div class="${singlePost.isActive === true ? 'absolute -top-1 right-2  bg-[#10B981] w-4 h-4 rounded-full' : 'absolute -top-1 right-2  bg-[#FF3434] w-4 h-4 rounded-full'}"></div>
                        </div>
                    </div>

                    <div class="space-y-4 w-full">

                        <div class="flex items-center gap-4 font-bold">
                            <p># ${singlePost.category}</p>
                            <p>Author : ${singlePost.author.name}</p>
                        </div>

                        <div class="w-full">
                            <h3 class=" font-bold text-2xl mb-4">${singlePost.title}</h3>
                            <p class=" ">${singlePost.description}</p>
                        </div>
                        
                    <hr class=" border-b-1 border-dashed border-gray-400">
                        <div class="flex justify-between items-center w-full ">
                            <div class="flex gap-8">
                                <p><i class="fa-regular fa-message mr-4"></i>${singlePost.comment_count}</p>
                                <p><i class="fa-regular fa-eye mr-4"></i>${singlePost.view_count}</p>
                                <p><i class="fa-regular fa-clock mr-4"></i><span>${singlePost.posted_time} </span>min</p>
                            </div>
                            <div class="read bg-[#10B981] rounded-full">
                                <i class="fa-solid fa-envelope-open p-2 text-white cursor-pointer"></i>
                            </div>
                        </div>

                    </div>
                </div>
        `
        postContainer.appendChild(div)
    })


    //  mark as read

    let count = 0
    const envelop = document.getElementsByClassName("read")

    for (const read of envelop) {

        read.addEventListener("click", function (e) {
            count++
            const readCount = document.getElementById('read-count')
            readCount.innerText = count

            const postTitle = e.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].innerText

            const viewCount = e.target.parentNode.parentNode.childNodes[1].childNodes[3].childNodes[1].nodeValue


            const readContainer = document.getElementById("mark-read-container")

            const div = document.createElement("div")
            div.classList = "bg-[#f3f3f4]  p-2 lg:w-[400px]  "
            div.innerHTML = `
            <div class=" bg-white flex gap-4 justify-between items-center p-2 rounded-lg
             ">
                <h4 class="w-48  font-bold">${postTitle} </h4>
                <div>
                    <p><i class="fa-regular fa-eye mr-2"></i><span>${viewCount} </span> </p>
                </div>
            </div>
            `
            readContainer.appendChild(div)
        })
    }
}

// search function

const handleSearch = async () => {

    const readCount = document.getElementById('read-count')
    readCount.innerText = 0

    const readContainer = document.getElementById("mark-read-container")
    readContainer.innerHTML = ''


    loadingSpinner.classList.remove('hidden')
    const searchText = document.getElementById('search-text').value
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`)

    const data = await res.json()

    const categoryData = data.posts

    displayPosts(categoryData)

    document.getElementById('search-text').value = ''

}

loadPost()

// latest post

const loadLatestPosts = async () => {


    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts")
    const data = await res.json()
    // console.log(data)

    displayLatestPosts(data)
}


//  display latest posts

const displayLatestPosts = (data) => {

    const latestPostContainer = document.getElementById("latest-post-container")

    data.forEach(post => {

        const div = document.createElement("div")

        div.classList = "card bg-base-100 shadow-xl border-2 border-gray-200"

        div.innerHTML = `
    
                    <figure class="px-8 pt-8">
                        <img src="${post.cover_image}" alt="Shoes"
                            class="rounded-xl" />
                    </figure>

                    <div class="card-body font-mulish  ">
                        <div class="text-[#12132D99]">
                            <i class="fa-regular fa-calendar-plus"></i> <span>${post.author.posted_date ? post.author.posted_date : "No Publish Date"} </span>
                        </div>
                        <h2 class="card-title font-extrabold text-2xl text-[#12132D]">${post.title} </h2>
                        <p class="text-[#12132D99]">${post.description} </p>
                        <div class="flex gap-4 items-center">
                            <div class="w-16 rounded-full">
                                <img class="rounded-full"
                                    src="${post.profile_image}" alt="">
                            </div>
                            <div>
                                <h4 class="font-extrabold text-xl">${post.author.name} </h4>
                                <p class="text-[#12132D99]">${post.author.designation ? post.author.designation : "Unknown"} </p>

                            </div>
                        </div>
                    </div>
        `
        latestPostContainer.appendChild(div)
    })
}
loadLatestPosts()

