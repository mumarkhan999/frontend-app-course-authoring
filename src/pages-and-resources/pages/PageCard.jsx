import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Button } from '@edx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import messages from '../messages';

const CoursePageShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  showSettings: PropTypes.bool.isRequired,
  showStatus: PropTypes.bool.isRequired,
  showEnable: PropTypes.bool.isRequired,
});

export { CoursePageShape };

function PageCard({ intl, page }) {
  const pageStatusMsgId = page.isEnabled ? 'pageStatus.enabled' : 'pageStatus.disabled';
  const componentClasses = classNames(
    'd-flex flex-column align-content-stretch',
    'bg-white p-3 border shadow',
    { 'border-info-300': page.isEnabled, 'border-gray-100': !page.isEnabled },
  );

  return (
    <div
      className="d-flex flex-column align-content-stretch p-3 col-sm-12 col-md-6 col-lg-4"
    >
      <div
        className={componentClasses}
        style={{
          flexBasis: '100%',
        }}
      >
        <div className="d-flex flex-row">
          <span className="font-weight-bold">{page.title}</span>
          {page.showSettings && <FontAwesomeIcon icon={faCog} className="ml-auto" />}
        </div>

        <div>
          {page.showStatus && <span>{intl.formatMessage(messages[pageStatusMsgId])}</span>}
        </div>

        <div className="mt-3">
          <p>{page.description}</p>
        </div>

        {page.showEnable && !page.isEnabled && (
        <div className="d-flex justify-content-center">
          <Button variant="outline-primary">
            {intl.formatMessage(messages['enable.button'])}
          </Button>
        </div>
        )}
      </div>
    </div>
  );
}

PageCard.propTypes = {
  intl: intlShape.isRequired,
  page: CoursePageShape.isRequired,
};

export default injectIntl(PageCard);