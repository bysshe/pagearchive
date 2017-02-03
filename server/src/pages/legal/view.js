/* globals location*/
const reactruntime = require("../../reactruntime");
const { Footer } = require("../../footer-view.js");
const React = require("react");

class Terms extends React.Component {
  render() {
    return <div>
      Last Updated August 23, 2016
      <h3>Summary</h3>
      <p>
        This top section summarizes the terms below. This summary is provided to help your understanding of the terms, but be sure to read the entire document, because when you agree to it, you are indicating you accept all of the terms, not just this summary.
      </p>
      <ul>
        <li>
          “Page Archive is an experimental add-on.
        </li>
        <li>
          Page Archive is provided "as is" and there are no warranties of any kind. There are significant limits on liability for any damages arising from your use of Page Archive.
        </li>
        <li>
          Page Archive is currently an experiment. Please do not upload any sensitive information to the Page Archive service. Your Archives may be deleted at any time for any or no reason.
        </li>
      </ul>
      <h3>Terms of Service</h3>
      <h3>Introduction</h3>
      <p>
        These Terms of Service ("Terms") govern your use of Page Archive (defined below), an experimental service. “Page Archive” includes all of the the following:
      </p>
      <ul>
        <li>
          the Page Archive add-on that allows you to capture copies of webpages (“Archives”)
        </li>
        <li>
          the Page Archive service that allows you to share your Archives using a URL
        </li>
      </ul>
      <p>
        ("Page Archive"). By accessing the Page Archive add-on or the Page Archive service, you agree to be bound by these Terms. If an Archive has been shared with you, your access to the Archive is governed by our Websites & Communications <a target="_blank" href="https://www.mozilla.org/en-US/about/legal/terms/mozilla/">Terms of Use</a>.
      </p>
      <h3>Features</h3>
      <p>
        Page Archive lets you save web content and share it with others via a URL. You can save entire webpages for your own reference or to share with others. You can view or delete each of your archives from the “My Archives” page.
      </p>
      <h3>Privacy Policy</h3>
      <p>
        The Test Pilot Page Shot website and the <a href="https://testpilot.firefox.com/privacy" target="blank">Test Pilot Privacy Notice</a> describes details on what we receive from your use of Page Shot and how we use that information. We use the information we receive through Page Archive as described in our <a href="https://www.mozilla.org/privacy/" target="blank">Mozilla Privacy Policy</a>.  Note that these documents are accurate, but this service is not hosted by Mozilla.
      </p>
      <h3>Your Content in our Services</h3>
      <p>
        You may upload content as part of Page Archive. By uploading content, you hereby grant us a nonexclusive, royalty-free, worldwide license to use your uploaded content in connection with the provision of the Page Archive service. You retain any intellectual property rights you may have to your uploaded content. You hereby represent and warrant that your uploaded content and use of the Page Archive service will not infringe the rights of any third party and will comply with any content guidelines presented by Mozilla.
      </p>
      <h3>Proprietary Rights</h3>
      <p>
        The Page Archive service does not grant you any intellectual property rights in Page Archive that are not specifically stated in these Terms. For example, these Terms do not provide the right to use any copyrights, trade names, trademarks, service marks, logos, domain names, or other distinctive brand features. The source code for the Page Archive add-on and service are available under and subject to their respective open source licenses.
      </p>
      <h3>Term; Termination</h3>
      <p>
        These Terms will continue to apply until ended by either you or the service. You can choose to end them at any time for any reason by deleting all of your Archives, uninstalling the Page Archive experimental add-on and discontinuing your use of Page Archive.
      </p>
      <p>
        We may suspend or terminate your access to Page Archive at any time for any reason, including, but not limited to, if we reasonably believe: (i) you have violated these Terms, (ii) you create risk or possible legal exposure for us; or (iii) our provision of Page Archive to you is no longer commercially viable. We will make reasonable efforts to notify you the next time you attempt to access Page Archive.
      </p>
      <p>
        In all such cases, these Terms shall terminate, including, without limitation, your license to use Page Archive, except that the following sections shall continue to apply: Indemnification, Disclaimer; Limitation of Liability, Miscellaneous.
      </p>
      <h3>Indemnification</h3>
      <p>
        You agree to defend, indemnify and hold harmless Mozilla, its contractors, contributors, licensors, and partners, and their respective directors, officers, employees and agents ("Indemnified Parties") from and against any and all third party claims and expenses, including attorneys' fees, arising out of or related to your use of Page Shot (including, but not limited to, from any content uploaded by you).
      </p>
      <h3>Disclaimer; Limitation of Liability</h3>
      <p>
        PAGE SHOT IS PROVIDED "AS IS" WITH ALL FAULTS. TO THE EXTENT PERMITTED BY LAW, MOZILLA AND THE INDEMNIFIED PARTIES HEREBY DISCLAIM ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES THAT PAGE SHOT IS FREE OF DEFECTS, MERCHANTABLE, FIT FOR A PARTICULAR PURPOSE, AND NON-INFRINGING. YOU BEAR THE ENTIRE RISK AS TO SELECTING PAGE SHOT FOR YOUR PURPOSES AND AS TO THE QUALITY AND PERFORMANCE OF PAGE SHOT, INCLUDING WITHOUT LIMITATION THE RISK THAT YOUR CONTENT IS DELETED OR CORRUPTED OR THAT SOMEONE ELSE ACCESSES YOUR ACCOUNT. THIS LIMITATION WILL APPLY NOTWITHSTANDING THE FAILURE OF ESSENTIAL PURPOSE OF ANY REMEDY. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF IMPLIED WARRANTIES, SO THIS DISCLAIMER MAY NOT APPLY TO YOU. PAGE SHOT IS CURRENTLY AN EXPERIMENT. PLEASE DO NOT UPLOAD ANY SENSITIVE INFORMATION TO THE PAGE SHOT SERVICE. YOUR SHOTS MAY BE DELETED AT ANY TIME FOR ANY OR NO REASON.
      </p>
      <p>
        EXCEPT AS REQUIRED BY LAW, MOZILLA AND THE INDEMNIFIED PARTIES WILL NOT BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES ARISING OUT OF OR IN ANY WAY RELATING TO THESE TERMS OR THE USE OF OR INABILITY TO USE PAGE SHOT, INCLUDING WITHOUT LIMITATION DIRECT AND INDIRECT DAMAGES FOR LOSS OF GOODWILL, WORK STOPPAGE, LOST PROFITS, LOSS OF DATA, AND COMPUTER FAILURE OR MALFUNCTION, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND REGARDLESS OF THE THEORY (CONTRACT, TORT, OR OTHERWISE) UPON WHICH SUCH CLAIM IS BASED. THE COLLECTIVE LIABILITY OF MOZILLA AND THE INDEMNIFIED PARTIES UNDER THIS AGREEMENT WILL NOT EXCEED $500 (FIVE HUNDRED DOLLARS). SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL, CONSEQUENTIAL, OR SPECIAL DAMAGES, SO THIS EXCLUSION AND LIMITATION MAY NOT APPLY TO YOU.
      </p>
      <h3>Modifications to these Terms</h3>
      <p>
        We may update these Terms from time to time to address a new feature of Page Archive or to clarify a provision. The updated Terms will be posted online. If the changes are substantive, we will announce the update through usual channels for such announcements such as blog posts, banners, and forums. Your continued use of Page Archive after the effective date of such changes constitutes your acceptance of such changes. To make your review more convenient, we will post an effective date at the top of this page.
      </p>
      <h3>Miscellaneous</h3>
      <p>
        These Terms constitute the entire agreement between you and the Page Archive service concerning Page Archive and are governed by the laws of the state of California, U.S.A., excluding its conflict of law provisions. If any portion of these Terms is held to be invalid or unenforceable, the remaining portions will remain in full force and effect. In the event of a conflict between a translated version of these terms and the English language version, the English language version shall control.
      </p>
      <h3>Contact Us</h3>
      <p>
        Contact the service runners at ian@ianbicking.org
      </p>
    </div>;
  }
}

class Privacy extends React.Component {
  render() {
    return <div>
      <p>
        We care about your privacy. When this service collects information about you, our <a href="https://www.mozilla.org/privacy/" target="blank">Privacy Policy</a> describes how we handle that information.
      </p>
      <p>
        Page Archive is an experimental service users that allows you to capture, save, and share copies of webpages (“Archives”). The data we collect is described in the Page Shot Test Pilot experiment page and in the <a href="https://testpilot.firefox.com/privacy" target="_blank">Test Pilot Privacy Notice.</a>
      </p>
      <p>
        For all visits to the Page Archive website (for example, if someone has shared a Archive with you), the data we collect is described in our <a href="https://www.mozilla.org/privacy/websites/" target="_blank">Websites, Communications & Cookies Privacy Notice</a>.
      </p>
    </div>;
  }
}

class Head extends React.Component {
  render() {
    return (
      <reactruntime.HeadTemplate {...this.props}>
        <link rel="stylesheet" href={this.props.staticLink("/static/css/simple.css")} />
      </reactruntime.HeadTemplate>
    );
  }
}

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {defaultSearch: props.defaultSearch};
  }

  render() {
    let content = null;
    if (this.props.page === "terms") {
      content = <Terms />;
    } else {
      content = <Privacy />;
    }
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <div className="column-space full-height default-color-scheme">
          <div className="header">
            <h1><a href="/shots">Page Shot</a></h1>
          </div>
          <div className="responsive-wrapper flex-1">
            <h2>{this.props.title}</h2>
            { content }
          </div>
          <Footer forUrl="legal" {...this.props} />
        </div>
      </reactruntime.BodyTemplate>
    )
  }
}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
