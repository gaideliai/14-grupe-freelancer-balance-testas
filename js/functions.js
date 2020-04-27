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
    let totalIncome = 0;
    let totalExpense = 0;
    let minIncMnth = {index: 1, value: Infinity};
    let maxIncMnth = {index: 1, value: 0};
    let minExpMnth = {index: 1, value: Infinity};
    let maxExpMnth = {index: 1, value: 0};
    
    for (let i=0; i<data.length; i++){
        const row = data[i];
        const income = row.income ? row.income : 0;
        const expense = row.expense ? row.expense: 0;
        const newBalance = income-expense;
        
        HTML+=`<div class="table-row">
                    <div class="cell">${i+1}</div>
                    <div class="cell">${months[i]}</div>
                    <div class="cell">${row.income ? row.income+' EUR' : '-'}</div>
                    <div class="cell">${row.expense ? row.expense+ ' EUR' : '-'}</div>
                    <div class="cell">${balance+newBalance+ ' EUR'}</div>
                </div>`;
        balance=balance+newBalance;
        
        totalIncome+=income;
        totalExpense+=expense; 

        if (income < minIncMnth.value && income !== 0) {
            minIncMnth.value = income;
            minIncMnth.index = i;
        }
        if (income > maxIncMnth.value && income !== 0) {
            maxIncMnth.value = income;
            maxIncMnth.index = i;
        }
        if (expense < minExpMnth.value && expense !== 0) {
            minExpMnth.value = expense;
            minExpMnth.index = i;
        }
        if (expense > maxExpMnth.value && expense !== 0) {
            maxExpMnth.value = expense;
            maxExpMnth.index = i;
        }
    }
    
    document.querySelector('.table-content').innerHTML = HTML;

    const DOMincome = document.querySelector('.table-footer .cell:nth-child(3)');
    const DOMexpense = document.querySelector('.table-footer > .cell:nth-child(4)');
    const DOMbalance = document.querySelector('.table-footer > .cell:nth-child(5)');

    DOMincome.innerText = totalIncome + ' EUR';
    DOMexpense.innerText = totalExpense + ' EUR';
    DOMbalance.innerText = balance + ' EUR';

    const DOMminIncome = document.querySelector('#minIncome');
    const DOMmaxIncome = document.querySelector('#maxIncome');
    const DOMminExpense = document.querySelector('#minExpense');
    const DOMmaxExpense = document.querySelector('#maxExpense');
    
    DOMminIncome.innerText = months[minIncMnth.index];
    DOMmaxIncome.innerText = months[maxIncMnth.index];
    DOMminExpense.innerText = months[minExpMnth.index];
    DOMmaxExpense.innerText = months[maxExpMnth.index];
}

renderTableRows(acc);