const musics = [
    {
      id: 1,
      title: "Holo",
      file: "holo.mp3",
      image:
        "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80",
    },
    {
      id: 2,
      title: "Summer",
      file: "mp3_music_summer.mp3",
      image:
        "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
        id: 3,
      title: "spark",
      file: "spark.mp3",
      image:"https://images.unsplash.com/photo-1665326330373-e1ca5ef6f2ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
        id:4,
        title: "home",
        file: "home.mp3",
        image: "https://images.unsplash.com/photo-1665366405948-0a49fdbde80f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
    },
   {
    id:5,
    title: "Our Story",
    file: "ChuyenDoiTa-EmceeLDaLAB-7120974.mp3",
    image: "https://avatar-ex-swe.nixcdn.com/song/share/2021/11/25/c/0/d/d/1637809827065.jpg"
   },
   {
    id:6,
    title: "Hey",
    file: "music-player_music_hey.mp3",
    image: "https://images.unsplash.com/photo-1665472832769-c8bffec9296f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
   },
   {
    id:7,
    title: "Ukulele",
    file: "music-player_music_ukulele.mp3",
    image: "https://images.unsplash.com/photo-1665412019489-1928d5afa5cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
   }
  ];

function render_list(array) {
    let htmls='';
      array.forEach((element,index) => {
      htmls+=` <div class="song index${index}">
          <div class="thumb"
              style="background-image: url('${element.image}')">
          </div>
          <div class="body">
              <h3 class="title">${element.title}</h3>
              <p class="author">${element.title}</p>
          </div>
          <div class="option">
              <i class="fas fa-ellipsis-h"></i>
          </div>
      </div>`
    });
    document.querySelector('.playlist').innerHTML=htmls;
}
render_list(musics)
let song=document.getElementById('audio');
let progress=document.getElementById('progress')
let isplaying=false;
let isrepeat=false;
let index_song=0;
let timer;
let thumb=document.querySelector('.cd-thumb')
let player=document.querySelector('.player')
const next_btn=document.querySelector('.btn-next')
let play_btn=document.querySelector('.btn-toggle-play')
const prev_btn=document.querySelector('.btn-prev')
const repeat_btn=document.querySelector('.btn-repeat')
const random_btn=document.querySelector('.btn-random')
const song_list=document.querySelectorAll('.song')
const current_time=document.querySelector('.curentTime')
const duration_time=document.querySelector('.duration')
song_list[index_song].classList.add('active')
function set_time() {
    timer= setInterval(() => {
        let {currentTime,duration}=song;
        let rangebar_value=(currentTime/duration)*100;
        progress.value=rangebar_value;
       if (currentTime && duration) {
        current_time.innerHTML=format_time(currentTime)
        duration_time.innerHTML=format_time(duration)
       }
        if (currentTime==duration) {
            if (!isrepeat) {
                reset_time()
               change_song(1)
            } else {
                reset_time()
                song.play()
            }
        }
    },700);
}
function reset_time() {
    current_time.innerHTML='0:00'
        duration_time.innerHTML='0:00'
        progress.value=0;
        currentTime=0;
}
function format_time(total_second) {
     let minute= Math.floor(total_second/60)
     let second=Math.round(total_second-minute*60)
     second=second<10 ? '0'+second : second;
     return `${minute}:${second}`
}
function handle_song() {
    thumb.style=`background-image: url("${musics[index_song].image}")`
   song.src=musics[index_song].file
   if (isplaying) song.play() 
   song_list.forEach(item=>item.classList.remove('active'))
   song_list[index_song].classList.add('active')
   progress.value=0;
}
function change_song(type) {
   if (type==1) {
        index_song= (index_song==musics.length-1) ? 0 : ++index_song;

   } else {
    index_song= (index_song==0) ? musics.length-1 : --index_song;
   }
   handle_song()
   reset_time()
}
function select_song() {
     song_list.forEach(element=>element.classList.remove('active'))
     index_song=parseInt(this.className.slice(-1))
     thumb.style=`background-image: url("${musics[index_song].image}")`
     song.src=musics[index_song].file
     reset_time()
     if (isplaying)  song.play()
     this.classList.add('active')
}
thumb.style=`background-image: url("${musics[index_song].image}")`
play_btn.addEventListener('click',()=> {
     if (!isplaying) {
        song.play();
        isplaying=true;
        player.classList.add('playing')
        thumb.classList.add('active')
       set_time()
     } else {
        song.pause()
        clearInterval(timer)
        isplaying=false;
        player.classList.remove('playing')
        thumb.classList.remove('active')
     }
})
next_btn.addEventListener('click',()=>{change_song(1)})
prev_btn.addEventListener('click',()=>{change_song(-1)})
song_list.forEach(item=>item.addEventListener('click',select_song))
progress.addEventListener('change',()=> {
    song.currentTime=(progress.value/100)*song.duration
})
repeat_btn.addEventListener('click',()=> {
    repeat_btn.classList.toggle('active')
    isrepeat= (isrepeat) ? false : true;
})
random_btn.addEventListener('click',()=> {
    let random_number;
     do {
      random_number=Math.floor(Math.random()*musics.length)
     } while(random_number==index_song)
     index_song=random_number
     reset_time()
     handle_song()
})
let cd_width=document.querySelector('.cd').offsetWidth;
document.onscroll=function () {
    let scroll_width=window.scrollY || document.documentElement.scrollTop;
    let new_width=cd_width-scroll_width;
    document.querySelector('.cd').style.width=new_width>0 ? new_width+'px' : 0;
}
