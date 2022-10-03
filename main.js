let list1; // переменные для массива чекнутых значений
let list2;
let list3;

let response1; // option - ответ сервера
let response2;
let response3;
let response4;

const demoOption1 = document.getElementById('demo2') // разметка для вставки option
const demoOption2 = document.getElementById('demo3')

function getBrandList1(str, idRequest) {

  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200 && idRequest === 1) {
      response1 = this.responseText;
    }
    if (this.readyState == 4 && this.status == 200 && idRequest === 2) {
      response2 = this.responseText;
    }
    if (this.readyState == 4 && this.status == 200 && idRequest === 3) {
      response3 = this.responseText;
    }
  };

  if (idRequest === 1) {
    xmlhttp.open("GET", "http://lk.ecomru.ru/get_category_test.php?q=" + str, false);
  }
  if (idRequest === 2) {
    xmlhttp.open("GET", "http://lk.ecomru.ru/get_brand_test.php?q=" + str, false);
  }
  if (idRequest === 3) {
    xmlhttp.open("GET", "http://lk.ecomru.ru/get_brand_by_cat_test.php?q=" + str, false);
  }
  xmlhttp.send();
}


$(function () {
  //1 select
  function demo1() {
    $('#demo1').multipleSelect({
      placeholder: 'Магазин',
      selectAllText: 'Выбрать все',
      width: 528,
      filter: true,
      filterAcceptOnEnter: true,
      ellipsis: true,
      showClear: true,
      filterPlaceholder: 'Поиск',
      displayDelimiter: " / ",
      formatSelectAll: function () {
        return 'Выбрать все'
      },
      formatAllSelected: function () {
        return '- Все магазины'
      },
      formatNoMatchesFound: function () {
        return 'По вашему запросу ничего не найдено'
      },
      onClick: function () {
        list1 = $('#demo1').multipleSelect('getSelects')
      },
      onCheckAll: function () {
        list1 = $('#demo1').multipleSelect('getSelects')
      },
      onUncheckAll: function () {
        list1 = []
        list2 = []
        demoOption1.innerHTML = ''
        demoOption2.innerHTML = ''
        $('#demo2').multipleSelect("refresh"); //обновляем
        $('#demo3').multipleSelect("refresh"); //обновляем
      },
      onClear: function () {
        list1 = []
        list2 = []
        demoOption1.innerHTML = ''
        demoOption2.innerHTML = ''
        $('#demo2').multipleSelect("refresh"); //обновляем
        $('#demo3').multipleSelect("refresh"); //обновляем
      },
      onClose: function () {
        if( list1.length > 0) {
          addOption()
        }       
      }
    })
  }
  demo1()

  //2 select
  function demo2() {
    $('#demo2').multipleSelect({
      placeholder: 'Категория',
      selectAllText: 'Выбрать все',
      width: 528,
      ellipsis: true,
      showClear: true,
      filter: true,
      filterAcceptOnEnter: true,
      filterPlaceholder: 'Поиск',
      displayDelimiter: " / ",
      formatSelectAll: function () {
        return 'Выбрать все'
      },
      formatAllSelected: function () {
        return '- Все категории'
      },
      formatNoMatchesFound: function () {
        return 'Выберите магазин'
      },
      onClick: function () {
        list2 = $('#demo2').multipleSelect('getSelects')
      },
      onCheckAll: function () {
        list2 = $('#demo2').multipleSelect('getSelects')
      },
      onUncheckAll: function () {
        list2 = []
        demoOption2.innerHTML = ''
        $('#demo3').multipleSelect("refresh"); //обновляем
      },
      onClear: function () {
        list2 = []
        demoOption2.innerHTML = ''
        $('#demo3').multipleSelect("refresh"); //обновляем
      },
      onClose: function () {
        if (list2.length > 0) {
          addOption2()
        }
      }
    })
  }
  demo2()

  //3 select
  function demo3() {
    $('#demo3').multipleSelect({
      placeholder: 'Бренд',
      selectAllText: 'Выбрать все',
      width: 528,
      filter: true,
      filterAcceptOnEnter: true,
      ellipsis: true,
      showClear: true,
      filterPlaceholder: 'Поиск',
      displayDelimiter: " / ",
      formatSelectAll: function () {
        return 'Выбрать все'
      },
      formatAllSelected: function () {
        return '- Все бренды-'
      },
      formatNoMatchesFound: function () {
        return 'Выберите магазин и категорию'
      },
      onClick: function () { },
      onCheckAll: function () { },
      onUncheckAll: function () { },
      onClear: function () { },
      onClose: function () { }
    })
  }
  demo3()
})

function addOption() {
  // в первый select
  getBrandList1(list1, 1)
  demoOption1.innerHTML = response1
  $('#demo2').multipleSelect("refresh"); //обновляем
  $('#demo2').multipleSelect("checkAll"); //обновляем
  //во второй select
  getBrandList1(list1, 2)
  demoOption2.innerHTML = response2
  $('#demo3').multipleSelect("refresh"); //обновляем
  $('#demo3').multipleSelect("checkAll"); //обновляем
}

function addOption2() {
  // в третий select
  getBrandList1(list2, 3)
  demoOption2.innerHTML = response3
  $('#demo3').multipleSelect("refresh"); //обновляем
  $('#demo3').multipleSelect("checkAll"); //обновляем
}

window.addEventListener('load', () => {
  $('#demo1').multipleSelect("checkAll")
  valList1 = [...document.querySelectorAll("select .filter_shop")]
  list1 = valList1.map(val => val.value)
  addOption()
  $('#demo2').multipleSelect("checkAll"); //обновляем
  $('#demo3').multipleSelect("checkAll"); //обновляем
})
