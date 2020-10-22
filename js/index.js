onload = () => {
    const doc = document;
    const form = doc.querySelector('form');
    /* 
    select下拉菜单使用以下代码

    form.addEventListener('change', () => {
        const select = doc.querySelectorAll('select');
        const productDate = getValue(select[0].value, sourceData, 'product');
        const regionDate = getValue(select[1].value, sourceData, 'region');
        const date = merge(regionDate, productDate);
        dateEmpty();
        setTable(date);
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
        let productDate = [];
        for (const str of productStr) {
            const arr = getValue(str, sourceData, 'product');
            productDate = productDate.concat(arr);
        }
        const regionStr = buttonGetValue('region');
        let regionDate = [];
        for (const str of regionStr) {
            const arr = getValue(str, sourceData, 'region');
            regionDate = regionDate.concat(arr);
        }
        const date = merge(regionDate, productDate);
        dateEmpty();
        setTable(date, productStr.length, regionStr.length);
    });
}
/*
    传入一个节点元素，
    获取节点元素value。
    再匹配数据，即可获取数据
*/
function getValue(value, dates, name) {
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
                arr = dates;
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
                arr = dates;
                return arr;
        }
    }
    for (const date of dates) {
        if (date[name] === str) {
            arr.push(date);
        }
    }
    return arr;
}
/* 
    生成表格
*/
function setTable(dates, pLength, rLength) {
    const doc = document;
    const table = doc.querySelector('table');
    const f = doc.createDocumentFragment();
    for (let i = dates.length - 1; i >= 0; i--) {
        const tr = doc.createElement('tr');
        let oneDate = dates[i];
        for (const key in oneDate) {
            if (!(Array.isArray(oneDate[key]))) {
                const td = doc.createElement('td');
                if (pLength > rLength) {
                    td.innerHTML = oneDate[key];
                    if (key === 'region') {
                        tr.insertBefore(td, tr.childNodes[0]);
                    } else {
                        tr.appendChild(td);
                    }
                } else {
                    td.innerHTML = oneDate[key];
                    tr.appendChild(td);
                }
            } else {
                for (const date of oneDate[key]) {
                    const td = doc.createElement('td');
                    td.innerHTML = date;
                    tr.appendChild(td);
                }
            }
        }
        f.appendChild(tr);
        // console.log(tr);
        // position(tr,table);
    }
    const th = doc.querySelectorAll('th');
    if (pLength > rLength) {
        th[0].innerHTML = '地区';
        th[1].innerHTML = '商品';
    } else {
        th[1].innerHTML = '地区';
        th[0].innerHTML = '商品';
    }
    table.appendChild(f);
}
/* 
    合并数组
*/
function merge(dates1, dates2) {
    let arr = [];
    for (const date1 of dates1) {
        for (const date2 of dates2) {
            if (date1 === date2) {
                arr.push(date1);
            }
        }
    }
    return arr;
}
/* 
清空表格数据
*/
function dateEmpty() {
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
function position(tr, table) {
    const trs = document.getElementsByTagName('tr');
    // console.log(1);
    // let x = 0;
    // let y = null;
    if (trs.length > 1) {
        for (let i = 0; i < trs.length; i++) {
            if (i===0) {
                continue;
            }
            console.log(2,trs[i]);
            // if (tr.childNodes[0].innerHTML === trs[i].childNodes[0].innerHTML) {
                table.insertBefore(tr,trs[i]);
                // ++x;
            // } else {
            //     table.appendChild(tr);
            // }
        }
    } else {
        console.log(1,tr);
        table.appendChild(tr);
    }
}