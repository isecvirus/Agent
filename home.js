'use strict'; // this code will be strict with (variables, classes, functions, etc..)

let host = "-";
let request_method = "get";
let headers = {};
let headers_count = 0;
let content_containers_count = 0;

const request_methods = [
    "get",
    "post",
    "delete",
    "put",
    "head",
    "connect",
    "options",
    "trace",
    "patch"
];

(() => {
    /* load default values and settings */

    let request_methods_obj = document.getElementsByClassName("request-method")[0].options;
    for (let M=0;M<request_methods.length;M++) {
        request_methods_obj.add(new Option(request_methods[M]));
    };
})()


window.addEventListener("scroll", (event) => {
    const position = this.scrollY;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let value = position * 100 / height;

    document.getElementsByClassName("scrollbar")[0].style.width = value+"%";
});


function Copy(content) {
    navigator.clipboard.writeText(content);
}

function request_host() {
    host = document.getElementsByClassName("host-field")[0].value;
    if (host.trim(/ /g).length > 0) {
        try {
            let xhttp = new XMLHttpRequest();
            const method = String(document.getElementsByClassName("request-method")[0].value);
            const host = String(document.getElementsByClassName("host-field")[0].value)
            xhttp.open(method.toUpperCase(), host, false); // false for synchronous request

            for (var h=0;h<Object.keys(headers).length;h++) {
                let header = String(Object.keys(headers)[h]); // must be as String
                let value = String(headers[h]); // must be as String
                
                if (header.trim(/ /g).length > 0 && value.trim(/ /g).length > 0) {
                    xhttp.setRequestHeader(header, value);
                }
            }

            // console.log(xhttp.getAllResponseHeaders());
            xhttp.send();
            xhttp.onload = (() => {
                document.getElementsByClassName("content")[0].value = xhttp.responseText;
            })()
        } catch (error){
            document.getElementsByClassName("content")[0].value = String(error);
        }
        
    }
}

function addHeader(element) {
    const parent = element.parentElement
    const submit_header_btn = parent.getElementsByClassName("submit-header-btn")[0];
    const header = parent.getElementsByClassName("header-name-field")[0];
    const value = parent.getElementsByClassName("header-value-field")[0];

    if (!(Object.keys(headers).includes(header.value)) && header.value.trim(/ /g).length > 0 && value.value.trim(/ /g).length > 0) {
        submit_header_btn.disabled = true;
        submit_header_btn.style = "background: gray;cursor: default;";
        submit_header_btn.title = "";
        header.disabled = true;
        value.disabled = true;

        headers[header.value] = value.value;
        parent.getElementsByClassName("comma")[0].style.textShadow = "0 0 25px lime, 0 0 25px lime, 0 0 25px lime";
        parent.getElementsByClassName("comma")[0].style.color = "lime";
        headers_count = Object.keys(headers).length;
        document.getElementsByClassName("add-new")[0].innerText = `Containers ${content_containers_count}, Headers ${headers_count}`;
        parent.getElementsByClassName("comma")[0].title = `added "${header.value}" header successfully`;
        return
    }
    // else
    parent.getElementsByClassName("comma")[0].style.textShadow = "0 0 25px red, 0 0 25px red, 0 0 25px red";
    parent.getElementsByClassName("comma")[0].style.color = "red";
    if (header.value.trim(/ /g).length < 1 && value.value.trim(/ /g).length < 1) {
        parent.getElementsByClassName("comma")[0].title = "this field can't be empty";
    } else {
        parent.getElementsByClassName("comma")[0].title = "header is already added";
    }
}

function copyHeader(element) {
    const parent = element.parentElement
    const header = parent.getElementsByClassName("header-name-field");
    const value = parent.getElementsByClassName("header-value-field");

    /* FOR MOBILE DEVICES */
    // *** select header.name field ***
    
    // header.select();
    // header.setSelectionRange(0, 9999);
    
    // *** select header.value field ***
    
    // value.select();
    // value.setSelectionRange(0, 9999);
    
    Copy(`${header[0].value}:${value[0].value}`);
}

function deleteHeader(element) {
    const parent = element.parentElement;
    const header = parent.getElementsByClassName("header-name-field")[0];
    parent.remove();

    delete headers[header.value];    
    headers_count = Object.keys(headers).length;
    content_containers_count -= 1;
    document.getElementsByClassName("add-new")[0].innerText = `Containers ${content_containers_count}, Headers ${headers_count}`;
}

function change_request_method() {
    request_method = document.getElementsByClassName("request-method")[0].value;
}

function resize_response() {

}

function Add() {
    const data = 
    `<div class="content-container">
    <input class="header-name-field" type="text" spellcheck="false" title="header" required>
    <span class="comma" title="header not added yet">:</span>
    <input class="header-value-field" type="text" spellcheck="false" title="value">
    <button style="--co:#3bb54a;" class="submit-header-btn" onclick="addHeader(this)" title="add header"></button>
    <button style="--co:#0db1ff;" class="copy-header-btn" onclick="copyHeader(this)" title="copy header:value"></button>
    <button style="--co:#f44336;" class="delete-header-btn" onclick="deleteHeader(this)" title="delete header"></button>
    </div>`

    document.getElementsByClassName("all-headers")[0].innerHTML += data;
    content_containers_count += 1;
    document.getElementsByClassName("add-new")[0].innerText = `Containers ${content_containers_count}, Headers ${headers_count}`;
}

let isIncreasing = false;

function Increase() {
    const response_obj = document.getElementsByClassName("content")[0]
    let height = response_obj.clientHeight - 20; // the 20 i thing the browser add it as a "more size" or something
    let new_height = height + 50;

    if (new_height > 0 && new_height < 10000) {
        response_obj.style.height = `${new_height}px`
        document.getElementsByClassName("response-content-size")[0].value = new_height;
        window.scrollBy(0, document.documentElement.scrollHeight);
    }
}

function Decrease() {
    const response_obj = document.getElementsByClassName("content")[0]
    let height = response_obj.clientHeight - 20; // the 20 i thing the browser add it as a "more size" or something
    let new_height = height - 50;

    if (new_height > 0 && new_height < 10000) {
        response_obj.style.height = `${new_height}px`
        document.getElementsByClassName("response-content-size")[0].value = new_height;
        window.scrollBy(0, document.documentElement.scrollHeight);
    }
}

function Clear_response() {
    document.getElementsByClassName("content")[0].value = "";
}

function Copy_response() {
    const response = document.getElementsByClassName("content")[0].value;
    Copy(response);
}