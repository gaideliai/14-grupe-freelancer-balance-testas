"use strict";

const months = ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'];

const acc = [];


function fixData (data) {
    let index = 0;
    for(let i=0; i<data.length; i++){
        for (let i=0; i<data.length; i++){
            if (data[i].month === 1+index) {
                acc.push(data[i]);                         
            }         
        }
        index+=1;
    }    
}

fixData (account);

function renderTableRows (data) {
    let HTML = '';
    let balance = 0;
    
    for (let i=0; i<data.length; i++){
        const row = data[i];
        row.income ? row.income : 0;
        row.expense ? row.expense: 0;
        let newBalance = (row.income? row.income : 0)-(row.expense ? row.expense: 0);
        
        HTML+=`<div class="table-row">
                    <div class="cell">${i+1}</div>
                    <div class="cell">${months[i]}</div>
                    <div class="cell">${row.income ? row.income+' EUR' : '-'}</div>
                    <div class="cell">${row.expense ? row.expense+ ' EUR' : '-'}</div>
                    <div class="cell">${balance+newBalance+ ' EUR'}</div>
                </div>`;
        balance=balance+newBalance;
    }
    
    return document.querySelector('.table-content').innerHTML = HTML;
}
renderTableRows(acc);

