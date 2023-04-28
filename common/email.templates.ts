export default class EmailTemplates {
  public successResetPassword = (name: string): string => {
    return `<h1>Welcome, ${name}!</h1>
        <p>Thanks for trying Afrive Book. We’re thrilled to have you on board. To get the most out of Afrive Book, do this primary next step:</p>
        
        <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        `;
  };
  public requestResetPassword = (name: string, token: string): string => {
    return `<h1>Hi ${name},</h1>
    <p>You recently requested to reset your password for your {{ product_name }} account. Use the button below to reset it.</p>
    <!-- Action -->
    <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <!-- Border based button https://litmus.com/blog/a-guide-to-bulletproof-buttons-in-email-design -->
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center">
                <table border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                    <h3>
                    ${token}
                    </h3>
                      <a href="{{action_url}}" class="button button--" target="_blank">Reset your password</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <p><em>This password reset is only valid for the next 24 hours.</em></p>
    <p>If you did not request a password reset, please ignore this email or <a href="{{support_url}}">contact support</a> if you have questions.</p>
    <p>Thanks,
      <br>The Beezop Team</p>
    <!-- Sub copy -->
    <table class="body-sub">
      <tr>
        <td>
          <p class="sub">If you’re having trouble with the button above, copy and paste the URL below into your web browser.</p>
          <p class="sub">{{action_url}}</p>
        </td>
      </tr>
    </table>
    `;
  };
  public welcomeEmail = (name: string, verification_token: string): string => {
    return `<h1>Welcome, ${name}!</h1>
        <p>Thanks for trying Afrive Book. We’re thrilled to have you on board. To get the most out of Afrive Book, do this primary next step:</p>
        
        <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          ${verification_token}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        `;
  };
  public confirmEmail = (code: string): string => {
    return `<h1>Afrive verification code</h1>

                <p>Use this code to confirm your email address:</p>
                
                <!-- Verification Code -->
                <table class="attributes" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="attributes_content">
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                    <td class="attributes_item code">${code}</td> 
                        </tr>
                    </table>
                    </td>
                </tr>
                </table>
                
                <p>If you did not sign up for a Beezop account, please ignore this email.</p>
                
                <p>Thanks,
          <br>Afrive Book</p>`;
  };
}
