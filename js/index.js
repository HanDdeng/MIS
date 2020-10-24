onload = () => {
    const doc = document;
    const form = doc.querySelector('form');
    /* 
    select下拉菜单使用以下代码

    form.addEventListener('change', () => {
        const select = doc.querySelectorAll('select');
        const productData = getValue(select[0].value, sourceData, 'product');
        const regionData = getValue(select[1].value, sourceData, 'region');
        const data = merge(regionData, productData);
        dataEmpty();
        setTable(data);
    }); 
    */

    /* 
    多选按钮点击时，调用的方法
    */
    form.addEventListener('click', (e) => {
        const ele = e.target;
        if (ele.name) {
            checkedButton(ele);
        } else {
            selectAll(ele);
        }
        const productStr = buttonGetValue('product');
        let productData = [];
        for (const str of productStr) {
            const arr = getValue(str, sourceData, 'product');
            productData = productData.concat(arr);
        }
        const regionStr = buttonGetValue('region');
        let regionData = [];
        for (const str of regionStr) {
            const arr = getValue(str, sourceData, 'region');
            regionData = regionData.concat(arr);
        }
        const data = merge(regionData, productData);
        if (data.length !== 0) {
            paintSvg(data[0].sale);    //svg绘制柱状图，只针对华东手机销量
            paintCanvas(data[0].sale);    //canvas绘制折线图，只针对华东手机销量
        }
        dataEmpty();
        setTable(data, productStr.length, regionStr.length);
        /* if (data.length > 0) {
            const tbody = doc.querySelector('tbody');
            // console.log(tbody);
            // tbody.addEventListener('click',(e) => {
            //     console.log(e.target.parentNode);
            // });
            const tr = tbody.getElementsByTagName('tr');
            for (let i = 0; i < tr.length; i++) {
                tr[i].x = tr.length-1;
                tr[i].addEventListener('click', (e) => {
                    console.log(data);
                    paintSvg(data[i].sale);    //svg绘制柱状图，只针对华东手机销量
                    paintCanvas(data[i].sale);    //canvas绘制折线图，只针对华东手机销量
                });
            }
        } */
    });
}
/*
    传入一个节点元素，
    获取节点元素value。
    再匹配数据，即可获取数据
*/
function getValue(value, datas, name) {
    let arr = [];
    let str = '';
    if (name === 'region') {
        switch (value) {
            case '1':
                str = '华东';
                break;
            case '2':
                str = '华南';
                break;
            case '3':
                str = '华北';
                break;
            default:
                arr = datas;
                return arr;
        }
    } else if (name === 'product') {
        switch (value) {
            case '1':
                str = '手机';
                break;
            case '2':
                str = '笔记本';
                break;
            case '3':
                str = '智能音箱';
                break;
            default:
                arr = datas;
                return arr;
        }
    }
    for (const data of datas) {
        if (data[name] === str) {
            arr.push(data);
        }
    }
    return arr;
}
/* 
    生成表格
*/
function setTable(datas, pLength, rLength) {
    const doc = document;
    const tbody = doc.querySelector('tbody');
    const f = doc.createDocumentFragment();
    for (let i = datas.length - 1; i >= 0; i--) {
        const tr = doc.createElement('tr');
        let oneData = datas[i];
        for (const key in oneData) {
            if (!(Array.isArray(oneData[key]))) {
                const td = doc.createElement('td');
                if (pLength > rLength) {
                    td.innerHTML = oneData[key];
                    if (key === 'region') {
                        tr.insertBefore(td, tr.childNodes[0]);
                    } else {
                        tr.appendChild(td);
                    }
                } else {
                    td.innerHTML = oneData[key];
                    tr.appendChild(td);
                }
            } else {
                for (const data of oneData[key]) {
                    const td = doc.createElement('td');
                    td.innerHTML = data;
                    tr.appendChild(td);
                }
            }
        }
        f.appendChild(tr);
    }
    const th = doc.querySelectorAll('th');
    if (pLength > rLength) {
        th[0].innerHTML = '地区';
        th[1].innerHTML = '商品';
    } else {
        th[1].innerHTML = '地区';
        th[0].innerHTML = '商品';
    }
    tbody.appendChild(f);
}
/* 
    合并数组
*/
function merge(datas1, datas2) {
    let arr = [];
    for (const data1 of datas1) {
        for (const data2 of datas2) {
            if (data1 === data2) {
                arr.push(data1);
            }
        }
    }
    return arr;
}
/* 
清空表格数据
*/
function dataEmpty() {
    const tr = document.querySelectorAll('tr');
    for (let i = tr.length - 1; i > 0; i--) {
        tr[i].remove();
    }
}
/* 
    全选方法
*/
function selectAll(element) {
    // const doc = document;
    const king = element.id.slice(3);
    const list = document.querySelectorAll(`[name=${king}]`);
    for (const goods of list) {
        goods.checked = true;
        element.checked = true;
    }
}
/* 
    多选方法
    但一组多选按钮被全选时，全选按钮checked为true
    但一组按钮都全选时，又一个多选按钮取消选择，全选按钮checked为false
    但一组按钮最后一个选择的按钮被取消勾选时，不允许！
*/
function checkedButton(element) {
    const doc = document;
    const king = element.name;
    let i = 0;
    const list = doc.querySelectorAll(`[name=${king}]`);
    const selectAllButton = doc.querySelector(`#All${king}`);
    for (let x = 0; x < list.length; x++) {
        if (list[x].checked) {
            ++i;
            j = x;
        }
    }
    if (i === 0) {
        list[j].checked = true;
    } else if (i === 3) {
        selectAllButton.checked = true;
    } else {
        selectAllButton.checked = false;
    }
}
/* 
    多选按钮模式下，获取数据用的方法
*/
function buttonGetValue(name) {
    const doc = document;
    let i = '';
    const product = doc.querySelectorAll(`[name=${name}]`);
    for (const obj of product) {
        if (obj.checked) {
            i += obj.value;
        }
    }
    return i = [...i];

}
/* function position(tr,tbody) {
    const doc = document;
    console.log(tbody.childNodes.length);
    const len = tbody.childNodes.length;
    if (len <= 1){
        tbody.appendChild(tr);
    } else {
        const str = tr.childNodes[0].innerHTML;
        for (const ttr of tbody.childNodes) {
            if (ttr.childNodes[0].innerHTML === str) {
                console.log(ttr.childNodes[0].innerHTML === str);
                tbody.insertBefore(tr,ttr);
            }
        }
    }
} */