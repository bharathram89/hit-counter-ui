import { Router } from '@angular/router';
// import { EWalletTx } from '../services/app.state';

export class NavigationUtil {
  readonly HOST_NAME_URL = 'kaiserpermanente.org';
  readonly CC_URL = 'http://localhost:18080/';
  readonly CC_URL_PARAM = '?appName=';
  readonly PAYMENT_TYPE_VIEW = '/payment-type-selection';
  readonly ROOT_VIEW = '/';
  readonly ERROR_VIEW = '/error'
  readonly ADD_ACH_VIEW = '/add-ach-account';
  readonly PAYMENT_LIST_VIEW = '/payment-method-list';

  constructor(private router: Router) {}

  public redirectToCardHolderDataPage(appVO$) {
      window.location.href = this.CC_URL;
      // window.URL()
  }

  public routeToAppComponent() {
    this.router.navigateByUrl(this.ROOT_VIEW);
  }
  
  public routeToPaymentTypeSelectionView() {
    this.router.navigateByUrl(this.PAYMENT_TYPE_VIEW);
  }

  public routeToAddACHView(type) {
    this.router.navigate([this.ADD_ACH_VIEW], {
      queryParams: { type: type }
    });
  }

  public routeToPaymentMethodListView() {
    this.router.navigateByUrl(this.PAYMENT_LIST_VIEW);
  }

  public goToAddPayment(paymentTypeSelected, appVO$) {
    if (paymentTypeSelected.type === 'CC') {
      this.redirectToCardHolderDataPage(appVO$);
    } else {
      this.routeToAddACHView(paymentTypeSelected.type);
    }
  }

  public redirectToNextStep(appVO$) {
    appVO$.subscribe(appvo => {
      window.location.href = appvo.nextURL;
    });
  }

  public redirectToPreviousStep(appVO$) {
    appVO$.subscribe(appvo => {
      window.location.href = appvo.previousURL;
    });
  }

  public routeIfSavedMethodsExistsOrRedirectToPreviousStep(appVO$) {
    appVO$.subscribe(appVO => {
      if (appVO.paymentMethodList.getIfSavedPaymentMethodListExists()) {
        this.router.navigateByUrl('');
      } else {
        this.redirectToPreviousStep(appVO$);
      }
    });
  }

  public routeToErrorView(){
    this.router.navigateByUrl(this.ERROR_VIEW);
  }

  public backFromAddPaymentView(appVO$){
    appVO$.subscribe(appVO => {
      if (appVO.featureHasMoreThanOnePaymentTypes ) {
        this.routeToPaymentTypeSelectionView();
      } else if (!appVO.featureHasMoreThanOnePaymentTypes && appVO.paymentMethodList.getIfSavedPaymentMethodListExists() ) {
        this.routeToPaymentMethodListView();
      } else {
        this.redirectToPreviousStep(appVO$);
      }
    }); 
  }


  public featureBasedAddPaymentMethod(appVO$){
    appVO$.subscribe(appVO => {
      if (appVO.featureHasMoreThanOnePaymentTypes) {
        this.routeToPaymentTypeSelectionView();
      } else {
        this.goToAddPayment(
          appVO.paymentTypeVOOptions[0],
          appVO$
        );
      }
    });
  }
}
