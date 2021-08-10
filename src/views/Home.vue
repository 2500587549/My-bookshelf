<template>
  <div class="home">
    <!-- logo -->
    <div class="logo">
      <span>Read Books</span>
      <i class="fa fa-user-o" aria-hidden="true"></i>
    </div>

    <!-- 导航 -->
    <div class="navigationBar">
      <span
        :class="{ pitchOn: color === 1 }"
        @click="(color = 1), (handpick = true),(classify = false),(bookrackaa = false)"
        >精选</span
      >
      <span
        :class="{ pitchOn: color === 2 }"
        @click="(color = 2), (handpick = false),(classify = true),(bookrackaa = false)"
        >分类</span
      >
      <span
        :class="{ pitchOn: color === 3 }"
        @click="(color = 3), (handpick = false),(classify = false),(bookrackaa = true)"
        >书架</span
      >
    </div>
    <!-- 书籍 -->
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      v-show="handpick"
    >
      <div class="books">
        <div class="book" v-for="book of books" :key="book._id">
          <div @click="bookParticulars(book)">
            <span class="picture">
            </span>
            <span class="message">
              <div class="bookname">{{ book.title }}</div>
              <div class="bookDescription">{{ book.shortIntro }}</div>
              <div class="writer">
                <span class="author">
                  <i class="fa fa-user-o" aria-hidden="true"></i>
                  <span>{{ book.author }}</span>
                </span>
                <span class="bookClassify">{{ book.majorCate }}</span>
              </div>
            </span>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <!-- 分类 -->
    <div class="classify" v-show="classify">
      <div class="classifies">
        <div
          class="classifys"
          v-for="classifybooks of classifyone"
          :key="classifybooks.bookCount"
        >
          <div>{{ classifybooks.name }}</div>
        </div>
      </div>
      <div class="classifytwoes">
        <div class="classifytwo" v-for="classifybooks of classifytwo" :key="classifybooks.bookCount">
          <div>{{ classifybooks.name }}</div>
        </div>
      </div>
      <div class="classifythrees">
        <div class="classifythree" v-for="classifybooks of classifythree" :key="classifybooks.bookCount">
          <div>{{ classifybooks.name }}</div>
        </div>
      </div>
      <div class="classifyfoures">
        <div class="classifyfour" v-for="classifybooks of classifyfour" :key="classifybooks.bookCount">
          <div>{{ classifybooks.name }}</div>
        </div>
      </div>
    </div>
    <div class="bookrack" v-show="bookrackaa">
      <div class="empty" v-show="bookrack.length===0">
        <a href="javascript:void(0)">返回首页</a>
        <div>请阅读书籍后添加到书架中</div>
      </div>
      <div class="bookracks" v-for="bookracks of bookrack" :key="bookracks._id">
        <div class="picture">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Home",
  data() {
    return {
      bookrackaa:false,
      classify:false,
      handpick: true,
      color: 1,
      count: 0,
      isLoading: false,
      books: [],
      book: {
        cover: "",
        title: "",
        shortIntro: "",
        author: "",
        majorCate: "",
      },
      classifyone: [],
      classifytwo: [],
      classifythree: [],
      classifyfour: [],
      classifybooks: {},
      racks:[],
      bookrack:[],
      bookracks:{},
    };
  },
  created() {
    this.racks = JSON.parse(localStorage.getItem("bookrack"))
    this.bookrack.push(this.racks[0])
    // console.log(this.bookrack);
    this.axios.get("/api/ranking/54d43437d47d13ff21cad58b").then((res) => {
      console.log(res);
      this.books = res.data.ranking.books;
      // console.log(this.books);
    });
    this.axios.get("/api//cats/lv2/statistics").then((res) => {
      this.classifyone = res.data.female;
      this.classifytwo = res.data.male;
      this.classifythree = res.data.picture;
      this.classifyfour = res.data.press;
      // console.log(this.classifyone);
      // console.log(this.classifytwo);
      // console.log(this.classifythree);
      // console.log(this.classifyfour);
    });
  },
  methods: {
    bookParticulars(arr) {
      // console.log(arr);
      localStorage.setItem("BookInfo", JSON.stringify(arr));
      this.$router.replace("/about");
    },
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  .logo {
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #aaa;
    span {
      font-size: 25px;
      font-weight: bold;
      margin: 10px;
    }
    i {
      color: #aaa;
      margin-right: 10px;
      font-size: 25px;
    }
  }
  .navigationBar {
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #aaa;
    span {
      font-size: 20px;
      padding-bottom: 10px;
      margin-top: 10px;
    }
  }
  .pitchOn {
    font-size: 20px;
    color: #fd8a55;
    border-bottom: 2px solid #fd8a55;
  }
  .books {
    width: 100%;
    height: 100%;
    .book {
      margin-top: 20px;
      padding-bottom: 20px;
      height: 120px;
      border-bottom: 1px solid #aaa;
    }
    .book > div {
      width: 100%;
      height: 100%;
      display: flex;
      .picture {
        margin-left: 10px;
        width: 100px;
        background: url(../assets/2.webp) no-repeat;
        background-position: center;
        background-size: cover;
      }
      .message {
        margin-left: 10px;
        margin-right: 10px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .bookname {
          font-weight: bold;
        }
        .bookDescription {
          color: #aaa;
          word-break: break-all;
          height: 65px;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .writer {
          display: flex;
          justify-content: space-between;
          .author {
            color: #fdd5c8;
            span {
              margin-left: 5px;
            }
          }
          .bookClassify {
            border: 1px solid;
            padding: 3px;
            border-radius: 6px;
            color: #a8c5d1;
          }
        }
      }
    }
  }
  .classify {
    width: 100%;
    height: 100%;
    .classifies{
      height: 25%;
    }
    .classifytwoes{
      height: 30%;
    }
    .classifythrees{
      height: 15%;
    }
    .classifyfoures{
      height: 25%;
    }
    .classifyfoures,
    .classifythrees,
    .classifytwoes,
    .classifies {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-content: space-around;
      border-bottom: 1px solid #ff0000;
      .classifyfour,
      .classifythree,
      .classifytwo,
      .classifys {
        width: 80px;
        height: 30px;
        border: 1px solid #aaa;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .bookrack{
    width: 100%;
    height: 100%;
    .empty{
      width: 100%;
      height: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 20px;
      a{
        margin-top: 15px;
        margin-bottom: 5px;
        color: #fd8a55;
      }
    }
    .bookracks{
      margin-top: 20px;
      margin-left: 10px;
      border: 1px solid;
      width: 80px;
      height: 100px;
      .picture{
        width: 100%;
        height: 100%;
        background: url(../assets/1.webp) no-repeat;
        background-position: center;
        background-size: cover;
      }
    }
  }
}
</style>