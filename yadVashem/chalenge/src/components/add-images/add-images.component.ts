import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-add-images',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-images.component.html',
  styleUrl: './add-images.component.scss'
})
export class AddImagesComponent {

  imgNumber: number = 123456;
  pathArr: string[] = []
  backPathArr: string[] = []
  isCheckboxChecked: boolean = false;
  addImgBool: boolean = false;
  addBackChecker: string[] = []
  imgGarbage: string = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0QDQ0SEg0NFRISDQ0NEhINDQ8NDRUPFREWFhUSFRUYKCggGBslHRYVIjEhMSkuLi4uFyAzODUvNyg5OjcBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEBAAMBAQEBAAAAAAAAAAAACAQGBwUDAQL/xABJEAABAwECCAkICAUCBwAAAAAAAQIDBAURBgcXNnSUs9EIEhMhMTVBcbJRUlNUYXN1tBYiMzRVcoGxFDJikqEVJiMlQoKRosH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A7gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAc/sA5wAAAAAAAAAAAAAAADiOEePd0dTLHSUcT4mPcxJZ5HXyXLdx2o3oavZzrel3R0AduBPuX20PUKP8Aum3jL7aHqFH/AHTbwKCBPuX20PUKP+6beMvtoeoUf9028CggcFs/H9Ucqzl7PhWK9Ed/DyPSVE7Vbxr0VfZzX+VDulHVRzRRSxuR0ckbJWOTocxzUc13/hUA+wAAAAAAAAAAAABf7ALwAAAAAAAY1oWhT07OUnnhijvROPPKyFl69CcZyol55f00sX8XszXqfeB7oPC+mli/i9ma9T7x9NLF/F7M16n3ge6DwvppYv4vZmvU+8fTSxfxezNep94HuO6F7lIeLEXDSxbl/wCb2Zr1PvI7AAAAAABYmAHUtkfDaLYtI7KqwJwtsmOyLLjfalnseyz6Rj2PrIGPa9IWorXIq3oqL2AbwDwvppYv4vZmvU+8fTSxfxezNep94Hug8L6aWL+L2Zr1PvH00sX8XszXqfeB7oPC+mli/i9ma9T7z0LMtejqUc6nqqaZGqiOWnnjmRq+ReKq3AZoAAAABegF6AAAAAAAmPHzW1L7dmjkV3JRRQNp2rejOTdG1znInRer1cir/SidhzksHCvAuzbURn8VT8ZzEVGSMe6OVEX/AKeMnSnsW9DWMiVg+ZV6yu4CZQU1kTsHzKvWV3DInYPmVesruAmUFNLiTsHzKvWV3DIlYPmVesruAmUFNZErB8yr1ldwyJWD5lXrK7gJlBTWRKwfMq9ZXcMiVg+ZV6yu4CZQU0mJKwfMq9ZXcMiVg+ZV6yu4CZQU1kTsHzKvWV3DInYPmVesruAmUFNZE7B8yr1ldwyJWD5lXrK7gJlBTWRKwfMq9ZXcMiVg+ZV6yu4CZTa8VtbUw25ZqwK7jPqY4Xtaq3Oge5EkRydqI293e1F7Dt+RKwfMq9ZXce/gpi+smzJFlp6deVVqt5WaR0siNXpRt/M39EvA2kAAAAAuAuAAAAAAAAAGjYxsZVNY6xx8i6aokZyiRNekbWx33I977luvVFuREW+5eg+GLnGjTWtI+BYHQVCMWRGLJysb2IvOrX3Jzpel6XdHRfz3cjx+Kv8Ar8vP0U1Mn/oYOJRf9yWb31fykwFVAAAAAAAAAAAAAAAA07GJjApbGjj48bpZ5UcscLHIz6rel73LfxW383QqqvZzLd5WL3GzTWpUfw0lO6CdWudGnKpNFIjUvVqOuRUddet13Qi85zbhF9dU/wANg285reKVf9wWX792zeBWYAAAAAAAFwF3tAAAAAAAAAExY+84JtHpfAYWJXOSze+r+UlM3H3nBNo9L4DCxK5yWb31fykoFVAAAAAAAAAAAAAAAAnDhF9dQfDYNtOa1ilzgsvSF2bjZeEX11B8Ng20xrWKXOCy9IXZuArQAAAAAAAC5fKBz+wAAAAAAAAATFj7zgm0el8BhYlc5LN76v5SUzcfecE2j0vgMLErnJZvfV/KSgVUAANOxsYSz2bZE00CokzpI6eN6tRyMc++99y8yqjUdd2X3dJOdmYeWzT1LZ22jVOcjuMrZ55JoXpfztexy3Ki/wCOy47hwhOo26dT+CQmoC2bMrEnp6eZEuSWCKZE8iPYjrv8nGcfWGldT1MNFTzyQs5BtRK+F6xyvc57kazjJzo1EbfzLz8bn6DrOCPVdm6BR7FpwHhC9eN0Gn8cgGXiVw5tD/VIaSaommhqOUbdPI6V0cjWK5rmOdeqJ9W5U6Oe8okk7FBnDZnvZNi8rFQJPwwxg2pWV00ja2pijSV7YYqeZ8DGRo5UbzNVL3XdKrz3+zmO0Yj8K6q0KCdtS9Xy00rY0ld/O+Nzb28byuS5yX9qXX8/OTVU/aSfnd+53bg1fdrU9/TeB4HZwABOHCL66g+Gwbac1rFLnBZekLs3Gy8IvrqD4bBtpzWsUucFl6QuzcBWgAAAAAAAHOBf7AAAAAAAAABMWPvOCbR6XwGFiVzks3vq/lJTNx95wTaPS+AwsSuclm99X8pKBVQAA5lwhOo26dT+CQmopXhCdRt06n8EhNQFmYI9V2boFHsWnAeEL143QafxyHfsEeq7N0Cj2LTgPCF68boNP45APCxQZw2Z72TYvKxUk7FBnDZnvZNi8rFQIiqftJPzu/c7twafu1qe/pvA84TU/aSfnd+53bg1fdrU9/TeB4HZwABOHCL66g+Gwbac1rFLnBZekLs3Gy8IvrqD4bBtpzWsUucFl6QuzcBWgAAAAAAAF4F6AAAAAAAAACYsfecE2j0vgMLErnJZvfV/KSmbj7zgm0em8BhYlc5LN76v5SUCqgABzLhCdRN06n8EhNRSvCE6ibp1P4JCagLMwR6rs3QKPYtOA8IXrxug0/jkO/YI9V2boFHsWnAeEL143QafxyAeFigzhsz3smxeVipJ2KDOGzPeybF5WKgRFU/aSfnd+53bg1fdrU9/TeB5wmp+0k/O79zu3Bq+7Wp7+m8DwOzgACcOEX11B8Ng205rWKXOCy9IXZuNl4RfXUHw2DbTmtYpc4LL0hdm4CtAAAAAAAAL0A5gAAAAAAAABMWPvOCbR6XwGFiVzks3vq/lJTNx95wTaPS+AwsSuclm99X8pKBVQAA5lwhOom6dT+CQmopXhCdRN06n8EhNQFmYI9V2boFHsWnAeEL143QafxyHfsEeq7N0Cj2LTgPCF68boNP45APCxQZw2Z72TYvKxUk7FBnDZnvZNi8rFQIiqftJPzu/c7twavu1qe/pvA84TU/aSfnd+53bg1fdrU9/TeB4HZwABOHCL66g+Gwbac1rFLnBZekLs3Gy8IvrqD4bBtpzWsUucFl6QuzcBWgAAAAAAAFwFwAAAAAAAAAmLH3nBNo1L4DCxK5yWb31fykpm4+84JtHpfAYWJXOSze+r+UlAqoAAc/x42XPU2FLyTHOWGaKpc1qXu5NvGRyonbcjr+5FJjpKaSWRkcbHPke5GMYxFc5zlW5ERC3DBpbGo4pXSx0lMyR380kcEbJV73Il4CwqR0NHSQuu40VNBC67o4zI2tX/KHBuEXZkzbSp6niLyMlKyFHon1UlY96qxV7FuVFTy8/kKHPlVU0UrFZJHG9i8zmyMa9i96LzKBMOJCy5p7epZGMVY6flJpX3LxWtWNzWoq+VXKiInf5CozGoaCnp2cSCCGJnTxYY2xMv7m8xkgRhhJZU1JW1MEzHNfHM9v1kuvbf9V6eVFS5UXyKd04OlmTxWfVzPY5rKidnJcZLuM2Nqor0/pvcqX/ANKnTq+yKOoVizUtPK5v8qzwxyq3uVyLcZjWo1ERERERERERLkRE7EA/QABOHCL66g+Gwbac1rFLnBZfv12bjZeEX11B8Ng20xrWKXOCy9IXZuArQAAAAAAAC72qBd7QAAAAAAAABMWPvOCbR6XwGFiVzks3vq/lJTYuEVY8kdpU9Vxf+HPTNj4yX3JNGq3tX/tVip5efyHMrGtWoo6mKop5OJNEquY/itdde1WrzLeioqKqfqBaoJcyx4Retx6rT7guOPCL1uPVafcBUYJcyx4Retx6rT7hljwi9bj1Wn3AVGCXMseEXrceq0+4ZY8IvW49Vp9wFRglzLHhF63HqtPuGWPCL1uPVafcBUYJcyx4Retx6rT7hljwi9bj1Wn3AVGCXMseEXrceq0+4ZY8IvW49Vp9wHqcIvrqD4bBtpjWsUucFl6QuzceNhJhDWWjUcvVS8pJxGxIvEYxEY1VVGojURE51Vf1NsxG2RJUW7TyIi8nTNlqJHXLcn1FYxt/lVzk5vIi+QCoQAAAAAAAOcDnAAAAAAAAAHl4S4P0to0klPUs40brlRUW6Rj0/lkY7scm9FvRThFuYi7Ujkd/CzU88V/1eO/kJkTyOav1f1RefyIUWAJhyL4Qegg1qI/Mi+EHoINaiKfAEwZF8IPQQa1EMi+EHoINaiKfAEwZF8IPQQa1EMi+EHoINaiKfAEwZF8IPQQa1EMi+EHoINaiKfAEw5F8IPQQa1EMi+EHoINaiKeAEw5F8IPQQa1EMi+EHoINaiKeAE3WViNtiSREmfSwsv8ArOWTl33eVrG8yr3qh3LAzBKjsql5CnavOqPllfcssj7rr3L2J5E6E/VT3wAAAAAAAAAv9gF/eAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABxgLwA7f0HaAAXsDgADugL0AAECAAECdoABOlR2/oAA7QvYAAUO6AAC9A7AACBoABO3vCdoADtHaAAXsDv/oABwUAD+QAB//Z";
  work: boolean = false;

  constructor(private http: HttpClient) { }

  @Input() next: boolean = false;
  @Input() collectionNumber = '';
  handleAddFirstImg() {


    const apiUrl = 'https://localhost:7020/api/Collection/getPath/';

    this.http.get<any>(`${apiUrl}${this.collectionNumber}`).subscribe(data => {
      this.pathArr.push(data.Path);
    })

    this.next = false;
    this.addImgBool = true
  }
  handleAddBack() {
    if (this.isCheckboxChecked) {

      const lastPath = this.pathArr.slice(-1)[0];
      this.addBackChecker.push(lastPath);
      this.isCheckboxChecked = false;

      this.addToBackArr(lastPath)
      console.log(this.backPathArr);


    }

  }

  addToBackArr(lastPath: string) {
    const lastChar = Number(lastPath.substring(lastPath.length - 1));
    const lastPathCut = lastPath.slice(0, -1)
    const backStr = `${lastPathCut}__${lastChar}`;
    this.backPathArr.push(backStr);
  }

  isStringInArray(str: string, back: string) {
    // return this.addBackChecker.includes(str);
    let isEquals = false;
    for (let i = 0; i < this.pathArr.length; i++) {
      if (back.substring(back.length - 1) === str.substring(str.length - 1)) {
        isEquals = true;
      } else {
        isEquals = false;
      }
    }
    return isEquals
  }

  handleAddImg() {
    const lastPath = this.pathArr.slice(-1)[0]
    const addNum = Number(lastPath.substring(lastPath.length - 1)) + 1
    const nextPath = `images/${this.collectionNumber}/${addNum}`

    this.pathArr.push(nextPath);



  }

  handleDelImg() {
    this.pathArr.pop();
    this.addBackChecker.pop();
    

  }
  
  handleSubmit(){

    const twoArr =  {backPathArr: this.backPathArr, pathArr: this.pathArr};
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const apiUrl = 'https://localhost:7020/api/Collection/AddFile/';

    this.http.post<any>(`${apiUrl}`, twoArr, { headers: headers } ).subscribe(data => {
      console.log(data);
      if (data.message === "work") {
        this.work = true;
      }
      
    })
  }

}

