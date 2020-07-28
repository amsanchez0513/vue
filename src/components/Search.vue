<template>
 <div class="search-wrapper">
    <input type="text" placeholder="Search for answers"/>
      <button type="submit"><i class="fa fa-search"></i></button>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  @import '../scss/main.scss';

   .search-wrapper {
    position: relative;
    padding: 20px 20px 20px 20px;
    align: center;

    label {
      position: absolute;
      font-size: 12px;
      color: #eeeeee;
      top: 8px;
      left: 12px;
      z-index: -1;
      transition: .15s all ease-in-out;
    }
    input {
      width: 90%;
      padding: 10px;
      font-size: 17px;
      border: 1px solid #eeeeee;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      float: left;      
      background: #ffffff;
      transition: .15s all ease-in-out;
      &:focus {
        outline: none;
        transform: scale(1.05);
        & + label  {
          font-size: 10px;
          transform: translateY(-24px) translateX(-12px);
        }
      }
      &::-webkit-input-placeholder {
          font-size: 12px;
          color: rgba(0,0,0,.50);
          font-weight: 100;
      }
    }
    button {
      float: left;
      width: 10%;
      padding: 10px;
      background: #03a84e;
      color: white;
      font-size: 17px;
      border: 1px solid #eeeeee;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-left: none; /* Prevent double borders */
      cursor: pointer;
    }
  }

  
</style>