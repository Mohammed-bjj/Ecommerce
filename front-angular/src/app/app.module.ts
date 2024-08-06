import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SignComponentComponent } from './views/sign-component/sign-component.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientPageComponent } from './views/client-page/client-page.component';
import { HomePageComponent } from './views/client-page/home-page/home-page.component';
import { ProductsPageComponent } from './views/client-page/products-page/products-page.component';
import { ProfilePageComponent } from './views/client-page/profile-page/profile-page.component';
import { WishlistPageComponent } from './views/client-page/wishlist-page/wishlist-page.component';
import { ConfirmationDialogComponent } from './views/dialogs/confirmation-dialog/confirmation-dialog.component';
import { EditProductDialogComponent } from './views/dialogs/edit-product-dialog/edit-product-dialog.component';
import { HeaderComponent } from './views/client-page/header/header.component';
import { ProfilePageComponentSeller } from './views/seller-page/profile-page/profile-page.component';
import { CreateProductDialogComponent } from './views/dialogs/create-product-dialog/create-product-dialog.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { MatTreeModule } from '@angular/material/tree';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { FooterComponent } from '../app/views/client-page/footer/footer.component';
import { HomeComponent } from './views/seller-page/home/home.component'
import { AuthGuard } from './guards/auth.guard';
import { AfterAuthGuard } from './guards/after-auth.guard';
import { CreateAdminComponent } from './views/dialogs/create-admin/create-admin.component';
import { MatTableModule } from '@angular/material/table'  


@NgModule({
  declarations: [
    AppComponent,
    ClientPageComponent,
    SignComponentComponent,
    HeaderComponent,
    HomePageComponent,
    ProductsPageComponent,
    WishlistPageComponent,
    ProfilePageComponent,
    ProfilePageComponentSeller,
    ConfirmationDialogComponent,
    EditProductDialogComponent,
    CreateProductDialogComponent,
    FooterComponent,
    HomeComponent,
    CreateAdminComponent,
  ],
  imports: [
    MatTableModule,
    BrowserAnimationsModule,
    MatTreeModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatCarouselModule.forRoot(),
    RouterModule.forRoot([
      {path: "",  redirectTo: "/home-user", pathMatch:"full"},
      { path: 'home-user', component: HomePageComponent },
      { path: 'sign-page', component: SignComponentComponent, canActivate: [AfterAuthGuard] },
      { path: 'mon-compte', component: ClientPageComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
      { path: 'home-admin', component: HomeComponent, canActivate: [AuthGuard]},
      { path: 'product', component: ProductsPageComponent},
      { path: 'panier', component: WishlistPageComponent},


    ]),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }
   
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
