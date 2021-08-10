<template>
  <div class="book" :style="colour">
    <div class="operation" v-show="operation">
      <div class="head">
        <i class="fa fa-angle-left" aria-hidden="true" @click="rollback"></i>
        <span class="righthead">
          <span class="choice" @click="playback">播放本章</span>
          <span class="choice" @click="addbookrack">加入书架</span>
        </span>
      </div>
      <div class="centre" @click="centre"></div>
      <div class="foot">
        <div class="chapter">
          <span class="addition" @click="last">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
            <span>上一章</span>
          </span>
          <span class="entire">全部章节</span>
          <span class="addition" @click="next">
            下一章
            <i class="fa fa-angle-right" aria-hidden="true"></i>
          </span>
        </div>
        <div class="fontsize">
          <span class="size">
            {{ fontsize }}
          </span>
          <span class="addition" @click="largen">
            <span>A</span>
            <span>+</span>
          </span>
          <span class="addition" @click="diminish">
            <span>A</span>
            <span>-</span>
          </span>
        </div>
        <div class="pattern">
          <div class="patternbox">
            <span class="white" @click="white">白天</span>
            <span class="eyeshield" @click="eyeshield">护眼</span>
            <span class="loveliness" @click="loveliness">可爱</span>
            <span class="night" @click="night">夜间</span>
          </div>
        </div>
      </div>
    </div>
    <div class="clicktrue" @click="clicktrue"></div>
    <div class="bookfirst" style="font-size: 16px">{{ lookboor.title }}</div>
    <writing class="writing"></writing>
  </div>
</template>

<script>
import writing from "@/components/writing.vue";
export default {
  name: "Book",
  components: {
    writing,
  },
  data() {
    return {
      bookrack:[],
      ReadBook: {},
      lookboor: {},
      operation: false,
      fontsize: 16,
      books: {},
      num: 0,
      colour: {
        background: "#f0f0e7",
        color:"#5d3810"
      },
    };
  },
  created() {
    this.bookInfo = JSON.parse(localStorage.getItem("BookInfo"));
    this.ReadBook = JSON.parse(localStorage.getItem("ReadBook"));
    this.books = JSON.parse(localStorage.getItem("books"));
    this.num = this.books.findIndex(
      (item) => item.title === this.ReadBook.title
    );
    // console.log(this.num);
    this.lookboor = this.books[this.num];
    // console.log(this.lookboor);
  },
  methods: {
    clicktrue() {
      this.operation = true;
    },
    centre() {
      this.operation = false;
    },
    rollback() {
      // console.log('点击');
      this.$router.replace("/about");
    },
    playback() {
      alert("播放本章");
    },
    addbookrack() {
      this.bookrack.push(this.bookInfo)
      console.log(this.bookrack);
      localStorage.setItem('bookrack',JSON.stringify(this.bookrack))
      alert("成功加入书架")
    },
    // 上一章
    last() {
      if (this.num != 0) {
        this.num--;
        this.lookboor = this.books[this.num];
      }
    },
    // 下一章
    next() {
      this.num++;
      this.lookboor = this.books[this.num];
    },
    // 字体变大
    largen() {
      this.fontsize++;
    },
    // 字体变小
    diminish() {
      this.fontsize--;
    },
    // 背景色
    white(){
      this.colour.background="#f0f0e7",
      this.colour.color="#5d3810"
    },
    eyeshield(){
      this.colour.background="#c9e2c9",
      this.colour.color="#2b5d34"
    },
    loveliness(){
      this.colour.background="#ffbaba",
      this.colour.color="#dc4747"
    },
    night(){
      this.colour.background="#000000",
      this.colour.color="#4d4d4d"
    }
  },
};
</script>

<style lang="scss" scoped>
.writing {
  margin-left: 20px;
  margin-right: 20px;
}
.book {
  .bookfirst {
    width: 100%;
    height: 6vh;
    display: flex;
    justify-content: center;
    line-height: 6vh;
    font-size: 18px;
  }
}
.clicktrue {
  position: fixed;
  top: 25%;
  bottom: 25%;
  left: 15%;
  right: 15%;
  z-index: 1;
  // background-color: #fff;
}
.operation {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 5;
  .head {
    width: 100%;
    height: 8vh;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .fa-angle-left {
      font-size: 30px;
      color: #aaa9a6;
      margin-left: 10px;
    }
    .righthead {
      height: 100%;
      display: flex;
      align-items: center;
      margin-right: 15px;
      .choice {
        width: 85px;
        height: 40px;
        background-color: #fc6e50;
        font-size: 14px;
        color: #fff;
        border-radius: 5px;
        text-align: center;
        line-height: 40px;
        margin-left: 5vw;
      }
    }
  }
  .foot {
    width: 100%;
    height: 20vh;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    bottom: 0;
    div {
      color: #b0afad;
      border: 1px solid #aaa;
    }
    .chapter {
      font-size: 20px;
      height: 33%;
      display: flex;
      justify-content: space-between;
      text-align: center;
      .addition {
        display: flex;
        width: 37%;
        justify-content: center;
        align-items: center;
      }
      .fa-angle-left {
        font-size: 20px;
        color: #aaa9a6;
        margin-right: 10px;
        margin-top: 2px;
      }
      .fa-angle-right {
        font-size: 20px;
        color: #aaa9a6;
        margin-top: 2px;
        margin-left: 10px;
      }

      .entire {
        width: 26%;
        height: 100%;
        line-height: 45px;

        border-left: 1px solid #aaa;
        border-right: 1px solid #aaa;
      }
    }
    .fontsize {
      font-size: 20px;
      height: 33%;
      display: flex;
      text-align: center;
      .size {
        width: 14%;
        line-height: 45px;
      }
      .addition {
        width: 43%;
        border-left: 1px solid #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .pattern {
      height: 33%;
      display: flex;
      justify-content: center;
      .patternbox {
        border: none;
        width: 90%;
        height: 100%;
        margin-top: 5px;
        display: flex;
        justify-content: space-between;
        .white,
        .eyeshield,
        .loveliness,
        .night {
          width: 15%;
          height: 28px;
          border-radius: 8px;
          font-size: 13px;
          text-align: center;
          line-height: 28px;
        }
        .white {
          background-color: #f0f0e7;
          color: #5d3810;
        }
        .eyeshield {
          background-color: #c9e2c9;
          color: #2b5d34;
        }
        .loveliness {
          background-color: #ffbaba;
          color: #dc4747;
        }
        .night {
          background-color: #000000;
          color: #4d4d4d;
        }
      }
    }
  }
  .centre {
    width: 100%;
    height: 72vh;
  }
}
</style>