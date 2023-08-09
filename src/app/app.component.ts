import { Component } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    form: any;
    emailRegex : string = '[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$'
    contactRegex : string = "[789][0-9]{9}"
  
    constructor( fb : FormBuilder ){


      fb.group({
        fullName : ['',[                   //represents the new intance of FormControl class
          Validators.required,
          Validators.minLength(5)
        ]],
        email : ['',[                   
          Validators.required,
          Validators.email
        ]],   
        contactDetails: fb.group({
          address: ['', Validators.required],
          shippingAddress : ['', Validators.required],
          contactNo : ['',
            Validators.required,
            Validators.pattern(this.contactRegex)
          ]
        }),
        skills : fb.array([])                        
      })


      // this.form = new FormGroup ({
      //   fullName : new FormControl('', [
      //     Validators.required,
      //     Validators.minLength(5)
      //   ]),
      //   email : new FormControl('', [
      //     Validators.required,
      //     // Validators.pattern(this.emailRegex)
      //     Validators.email                    //we can use this as well as above one, both are same. ln21
      //   ]),
        

      //   contactDetails: new FormGroup ({
      //     address : new FormControl('',[ Validators.required ]),
      //     shippingAddress: new FormControl('',[ Validators.required ]),
      //     contactNo: new FormControl('',[
      //       Validators.required,
      //       Validators.pattern(this.contactRegex)
      //     ])
      //   }),
        
      //   skills: new FormArray([])
      // });
      
    }

    get fullname(){
      return this.form.get('fullName');
    }

    get Email(){
      return this.form.get('email')
    }

    get Address(){
      return this.form.get('contactDetails.address')
    }
    get shippingAddress(){
      return this.form.get('contactDetails.shippingAddress')
    }
    get contactNo(){
      return this.form.get('contactDetails.contactNo')
    }

    get Skills () {
      return this.form.get('skills') as FormArray
    }

    onSubmit(){
      
      console.log(this.form.value)
    }


    addSkills(skills : HTMLInputElement){
      this.Skills.push(
        new FormControl(skills.value)
      )

      skills.value = '';        //this is to clear the skills input 

      console.log(this.form.value);
      
    }
   
    

    removeSkills(index: number){
      this.Skills.removeAt(index)
    }





}
