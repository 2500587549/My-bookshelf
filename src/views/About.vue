<template>
  <div>
    <div class="headline" >
      <i @click="backtrack" class="fa fa-angle-left" aria-hidden="true"></i>
      <span>{{ bookInfo.title }}</span>
      <i class="fa fa-user-o" aria-hidden="true"></i>
    </div>
    <div class="bookcover">
      <span class="picture">
      </span>
      <span class="bookintroduce">
        <div class="title">{{ bookInfo.title }}</div>
        <div>{{ bookInfo.author }}</div>
        <div>{{ bookInfo.majorCate }}</div>
      </span>
    </div>
    <div class="booksynopsis">
      <div>
        <span>内容简介：</span>
        <div class="bookDescription">
          {{ bookInfo.shortIntro }}
        </div>
      </div>
    </div>
    <div class="bookcatalogue">
      <div>目录</div>
      <div v-for="book of books" :key="book.order">
        <div class="book" @click="readbook(book)">{{ book.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      bookInfo: {},
      books: [],
      book: "",
      id:''
    };
  },
  created() {
    this.bookInfo = JSON.parse(localStorage.getItem("BookInfo"));
    this.id =this.bookInfo._id
    // console.log(this.id);
    this.axios
      .get('api/atoc/568fef99adb27bfb4b3a58dc?view=chapters')
      // .get(`/api/${this.id}?view=chapters`)
      .then((res) => {
        this.books = res.data.chapters;
        // console.log(this.books);
      });
  },
  methods:{
    backtrack(){
      // console.log('点击');
      this.$router.replace('/')
    },
    readbook(a){
      // console.log(a);
      localStorage.setItem('ReadBook',JSON.stringify(a))
      localStorage.setItem('books',JSON.stringify(this.books))
      this.$router.replace('/book')
    }
  }
};
</script>

<style lang="scss" scoped>

.headline {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid rgba(170, 170, 170, 0.2);
  font-size: 20px;
  color: #aaa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  i {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 25px;
  }
}
.bookcover {
  width: 100%;
  height: 15vh;
  margin-top: 10px;
  display: flex;
  border-bottom: 1px solid rgba(170, 170, 170, 0.2);
  .picture {
    width: 100px;
    margin-left: 10px;
        background: url(../assets/0.webp) no-repeat;
        background-position: center;
        background-size: cover;
  }
  .bookintroduce {
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .title{
      font-weight: bold;
      font-size: 18px;
    }
  }
}
.booksynopsis {
  border-bottom: 1px solid rgba(170, 170, 170, 0.5);
  height: 65px;
  div {
    height: 100%;
    margin-left: 10px;
    span {
      color: #aaa;
    }
.bookDescription {
  margin-right: 10px;
  word-break: break-all;
  height: 45px;
  width: 95%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
  }
}
.bookcatalogue {
  margin-top: 20px;
  margin-left: 10px;
}
.book {
  margin-top: 10px;
}
</style>