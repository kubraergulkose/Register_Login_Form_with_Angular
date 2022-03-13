import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import users from './_files/users.json';
import { CustomValidators } from './providers/CustomValidators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('closebutton') closebutton : any;
  @ViewChild('closebutton_register') closebutton_register : any;
  //Form Validables
  loginForm: FormGroup; //giriş formu
  registerForm: FormGroup; //kayıt formu
  submitted = false; //submit tusuna basılması
  registered = false; //register tusuna basılması
  isLoginSuccess = false;
  isRegisterSuccess = false;
  public userList:{email:string, password:string}[] = users;

  constructor( private formBuilder: FormBuilder){}
  //Add user form actions
  get f() { return this.loginForm.controls; }

  get f_register() { return this.registerForm.controls; }


  onSubmitLogin() { //Login fonksiyonu

    this.submitted = true; //subnit değerini true yap.
    if (this.loginForm.invalid) {
        return;
    }

    if(this.submitted)
    {

        const result = this.userList.find(({email,password}) =>
          {

            if ( email == this.loginForm.value.email &&    //Eğer bu değerler json dosyamızda varsa true dön.
               password == this.loginForm.value.password){
                return true;
               }
               return false;
           });

      // console.log(result); //I use it for debugging
      if(result)
      {
        this.isLoginSuccess=true;
        alert("Login is succesfully. Welcome !!!");
        this.closebutton.nativeElement.click();

      }else{

        this.isLoginSuccess=false;
        alert("Email or password is wrong!!!");

      }


    }

  }

   onSubmitRegister() { //Kayıt olunmuş mu?
     //console.log("kayıt tuşuna basıldı"); //kontrol için bunu bastırabiliriz.

     this.registered = true; //kayıt değerini true yap.
     if (this.registerForm.invalid) {
         return;
     }
     if(this.registered)
     {
       if(this.registerForm.value.password !=this.registerForm.value.password2 ) //password iki kere aynı girilmediyse;
       {

        this.registerForm.controls['password2'].setErrors({mustMatch: true}); //CustomValidatorümüzü kullandık. Parolalar aynı değilse;
       }else{

        alert("Register is succesfully. You can login with your credentail informations. !!!");
        this.closebutton_register.nativeElement.click();

       }

     }

   }
    ngOnInit() {
      //Form validasyonları login form için eklendi.
      this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      });

      //Form validasyonları kayıt -register- formu için eklendi.
      this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        password2: ['', [Validators.required ]],


        }
        );
    }
  }
