import { useState, type FormEventHandler } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { retrieveQueryParamFromUrl } from "oidc-spa/tools/urlQueryParams";

const result = retrieveQueryParamFromUrl({
    "url": window.location.href,
    "name": "my_custom_param",
});

if (result.wasPresent) {
    console.log("my_custom_param", result.value);
}


export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, message, isAppInitiatedAction } = kcContext;

    const pathLogoImg = `${url.resourcesPath}/img/sulogo.svg`
    const pathUserImg = `url(${url.resourcesPath}/img/person.png)`
    const pathPassImg = `url(${url.resourcesPath}/img/lock.png)`

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
        e.preventDefault();

        setIsLoginButtonDisabled(true);

        const formElement = e.target as HTMLFormElement;

        //NOTE: Even if we login with email Keycloak expect username and password in
        //the POST request.
        formElement.querySelector("input[name='email']")?.setAttribute("name", "username");

        formElement.submit();
    });

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayInfo={social.displayInfo}
            displayWide={realm.password && social.providers !== undefined}
            headerNode={msg("doLogIn")}
            infoNode={
                realm.password &&
                realm.registrationAllowed &&
                !registrationDisabled && (
                    <div id="kc-registration">
                        <span>
                            {msg("noAccount")}
                            <a tabIndex={6} href={url.registrationUrl}>
                                {msg("doRegister")}
                            </a>
                        </span>
                    </div>
                )
            }
        >

<div style={{height:"100%"}}>
<div className="container_12">
        <div className="grid_4 suffix_8">
            <a className="logo"></a>
        </div>
        <div className="box clear-float">
            <div className="grid_3">
                <div className="product-logo"></div>
            </div>
            <div className="grid_9 left-seperator">
                <div className="box-content clear-float">

	




           
               
                    {realm.password && (
                        <form  className="form-signin" onSubmit={onSubmit} action={url.loginAction} method="post">
                            <div className="row">
                            
<div className="col  s12 right-align">
	&nbsp;
</div>

	<div className="col s12">
		<div className="col m1 l3 hide-on-small-only">
			&nbsp;
		</div>
		                      <div className="center-align col s12 m10 l6">
					<img src={pathLogoImg} style={{width: "30%"}}/>
                        <br/>
					<h2 className="su_greentext" style={{color:"#00cb90",marginTop:"5px",marginBottom:"0px",fontFamily: "Kanit"}}><b>SU-NET</b></h2>
					<h5 className="grey-text text-lighten-2" style={{fontFamily: "Kanit"}}>Single Sign On (SSO)</h5>
					<br/>
				    </div>
		<div className="col m1 l3 hide-on-small-only">
			&nbsp;
		</div>
	</div>
                            <div className="col m2 l3 hide-on-small-only">&nbsp;</div>
                            <div className={getClassName("kcFormGroupClass")}>
                                
                                {!usernameHidden &&
                                    (() => {
                                        const label = !realm.loginWithEmailAllowed
                                            ? "username"
                                            : realm.registrationEmailAsUsername
                                                ? "email"
                                                : "usernameOrEmail";

                                        const autoCompleteHelper: typeof label = label === "usernameOrEmail" ? "username" : label;

                                        return (
                                            <>
                                               {/* <label htmlFor={autoCompleteHelper} className={getClassName("kcLabelClass")}>
                                                    {"USERNAME"}
                                        </label>*/}
                                        
                                                <div className="col s12 m8 l6 center-align "  style={{padding: "15px",display: "flex",justifyContent: "center",alignItems:"center",flexDirection:"column"}}>
                                  <input  tabIndex={1}
                                                    id={autoCompleteHelper}
                                                    
                                                    //NOTE: This is used by Google Chrome auto fill so we use it to tell
                                                    //the browser how to pre fill the form but before submit we put it back
                                                    //to username because it is what keycloak expects.
                                                    name={autoCompleteHelper}
                                                    defaultValue={login.username ?? ""}
                                                    type="text"
                                                    autoFocus={true}
                                                    autoComplete="off"         className="textbox browser-default su_textinput "     style={{paddingLeft: "50px",border: "solid 2px #00cb90",borderRadius: "20px", height: 
"45px", width: "90%",boxShadow: "1px 2px 2px 2px #ccc", fontSize: "1.5em",color: "#666666",backgroundImage: pathUserImg,backgroundRepeat:"no-repeat", backgroundPosition: "15px 50%", backgroundSize: "25px",maxWidth:"400px"}} placeholder="username/ชื่อผู้ใช้งาน"/>
                                    
                              </div>
                             
                                            </>
                                        );
                                    })()}
                                    
                            </div>
                            <div className="col m2 l3 hide-on-small-only">&nbsp;</div>

<div className="col s12">&nbsp;</div>

<div className="col m2 l3 hide-on-small-only">&nbsp;</div>

                            <div className={getClassName("kcFormGroupClass")}>
                            
                                {/*<label htmlFor="password" className={getClassName("kcLabelClass")}>
                                    {"PASSWORD"}
                                </label>*/}
                                <div className="col s12 m8 l6 center-align " style={{padding: "15px"}}>
                                 
                                 <input  tabIndex={2}
                                   id="password"
                                   
                                   name="password"
                                   type="password"
                                   autoComplete="off"       className="textbox browser-default su_textinput "  style={{paddingLeft: "50px",border: "solid 2px #00cb90",borderRadius: "20px", height: 
"45px", width: "90%",boxShadow: "1px 2px 2px 2px #ccc", fontSize: "1.5em",color: "#666666",backgroundImage:  pathPassImg,backgroundRepeat:"no-repeat", backgroundPosition: "15px 50%", backgroundSize: "25px",maxWidth:"400px"}} placeholder="password/รหัสผ่าน"/>
                                 
                             </div>
                             
                             
                            </div>
                            <div className="col m2 l3 hide-on-small-only">&nbsp;</div>
                            <div className="col  s12" >
                            &nbsp;
</div>
     
                            
                            {/*<div className={clsx(getClassName("kcFormGroupClass"), getClassName("kcFormSettingClass"))}>
                                <div id="kc-form-options">
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="checkbox">
                                            <label>
                                                <input
                                                    tabIndex={3}
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    type="checkbox"
                                                    {...(login.rememberMe === "on"
                                                        ? {
                                                            "checked": true
                                                        }
                                                        : {})}
                                                />
                                                {msg("rememberMe")}
                                            </label>
                                        </div>
                                    )}
                                </div>
                                <div className={getClassName("kcFormOptionsWrapperClass")}>
                                    {realm.resetPasswordAllowed && (
                                        <span>
                                            <a tabIndex={5} href={url.loginResetCredentialsUrl}>
                                                {msg("doForgotPassword")}
                                            </a>
                                        </span>
                                    )}
                                </div>
                                    </div>*/}

                        {message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                            /*<div className={clsx("alert", `alert-${message.type}`)}>
                                {message.type === "success" && <span className={getClassName("kcFeedbackSuccessIcon")}></span>}
                                {message.type === "warning" && <span className={getClassName("kcFeedbackWarningIcon")}></span>}
                                {message.type === "error" && <span className={getClassName("kcFeedbackErrorIcon")}></span>}
                                {message.type === "info" && <span className={getClassName("kcFeedbackInfoIcon")}></span>}
                                <span
                                    className="kc-feedback-text"
                                    dangerouslySetInnerHTML={{
                                        "__html": "Login failed, please try again."
                                    }}
                                />
                            </div>*/
                            <p style={{color: "red",fontSize: "0.5rem"}}>Login failed, please try again.</p>
                        )}




                            <div className="col  s12">
                            <div className="col m1 l4 hide-on-small-only">
		&nbsp;
	</div>
                            {/*<div id="kc-form-buttons" className={getClassName("kcFormGroupClass")}>*/}

                            <div className="col s12 m10 l4 center-align"  style={{marginTop: "20px;"}}>
                           
		                    <button   tabIndex={4}
                                    
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value="Log  In"
                                    disabled={isLoginButtonDisabled}     className="button primary"  /*onClick={()=>imageSubmit()}*/ style={{backgroundColor: "#00cb90", height: "45px",borderRadius: "20px", width: "95%", padding: "5px", paddingTop: "5px", 
border: "0px",maxWidth:"400px"}}><span className="white-text" style={{fontFamily: "Kanit",fontSize: "1.3em"}}><b>เข้าสู่ระบบ/Login</b></span></button>
<p className="center-align grey-text">

</p>
	</div>
    <div className="col m1 l4 hide-on-small-only">
		&nbsp;
	</div>
                            </div>
                            </div>


                           
                           {/*</div>*/}
                        </form>
                    )}
                
                {/*realm.password && social.providers !== undefined && (
                    <div
                        id="kc-social-providers"
                        className={clsx(getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass"))}
                    >
                        <ul
                            className={clsx(
                                getClassName("kcFormSocialAccountListClass"),
                                social.providers.length > 4 && getClassName("kcFormSocialAccountDoubleListClass")
                            )}
                        >
                            {social.providers.map(p => (
                                <li key={p.providerId} className={getClassName("kcFormSocialAccountListLinkClass")}>
                                    <a href={p.loginUrl} id={`zocial-${p.alias}`} className={clsx("zocial", p.providerId)}>
                                        <span>{p.displayName}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                            )*/}
            
            </div>
            </div>
            </div>
            </div>
</div>


            <div className="footer alt-color" style={{display: "flex",justifyContent: "center"}}>
            <div className="grid_7 suffix_3">
                <p className="grey-text center-align" style={{fontSize: "0.8rem"}}>
                    สำนักดิจิทัลเทคโนโลยี  มหาวิทยาลัยศิลปากร
                    <br/>
                    Bureau of Digital Technology, Silpakorn University
                    </p>
            </div>
            </div>
        </Template>
    );
}
