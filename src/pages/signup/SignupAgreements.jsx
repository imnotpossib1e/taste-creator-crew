import './signupAgreements.css';
import { checkboxStyle, linkButtonStyle } from './signupConstants';

// 약관 동의 - 전체 동의 + 개별 약관 3개
function SignupAgreements({ agreements, setAgreements, allAgreed, updateAgreement, showAgreementNotice }) {
  return (
    <div className="frame-10-8">
      <p className="layer--8">약관 동의</p>
      <div className="frame-10-9">
        <div className="frame-10-10">
          <label className="frame-14">
            <input
              type="checkbox"
              checked={allAgreed}
              onChange={(event) => {
                const checked = event.target.checked;
                setAgreements({
                  terms: checked,
                  privacy: checked,
                  location: checked,
                });
              }}
              style={checkboxStyle}
              aria-label="전체 동의"
            />
          </label>
          <p className="layer--9">전체 동의</p>
        </div>
        <div className="vector-7"></div>
        <div className="frame-10-11">
          <div className="frame-10-12">
            <div className="frame-8-5">
              <label className="frame-14-2">
                <input
                  type="checkbox"
                  checked={agreements.terms}
                  onChange={(event) =>
                    updateAgreement('terms', event.target.checked)
                  }
                  style={checkboxStyle}
                  aria-label="이용약관 동의"
                />
              </label>
              <p className="layer--10">이용약관 (필수)</p>
            </div>
            <button
              type="button"
              className="layer--11"
              style={linkButtonStyle}
              onClick={showAgreementNotice}
            >
              보기
            </button>
          </div>
          <div className="frame-10-13">
            <div className="frame-8-6">
              <label className="frame-15">
                <input
                  type="checkbox"
                  checked={agreements.privacy}
                  onChange={(event) =>
                    updateAgreement('privacy', event.target.checked)
                  }
                  style={checkboxStyle}
                  aria-label="개인정보 수집 및 이용 동의"
                />
              </label>
              <p className="layer--12">
                개인정보 수집 및 이용 (필수)
              </p>
            </div>
            <button
              type="button"
              className="layer--13"
              style={linkButtonStyle}
              onClick={showAgreementNotice}
            >
              보기
            </button>
          </div>
          <div className="frame-10-14">
            <div className="frame-8-7">
              <label className="frame-16">
                <input
                  type="checkbox"
                  checked={agreements.location}
                  onChange={(event) =>
                    updateAgreement('location', event.target.checked)
                  }
                  style={checkboxStyle}
                  aria-label="위치 정보 이용 동의"
                />
              </label>
              <p className="layer--14">위치 정보 이용 (선택)</p>
            </div>
            <button
              type="button"
              className="layer--15"
              style={linkButtonStyle}
              onClick={showAgreementNotice}
            >
              보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignupAgreements;
