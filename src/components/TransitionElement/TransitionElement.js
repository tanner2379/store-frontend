import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import classes from './TransitionElement.module.css'

const TransitionElement = props => {
  
  const fadeClasses = {
    appear: classes.FadeAppear,
    appearActive: classes.FadeAppearActive,
    enter: classes.FadeEnter,
    enterActive: classes.FadeEnterActive,
    exit: classes.FadeExit,
    exitActive: classes.FadeExitActive
  }

  const slideLeftClasses = {
    appear: classes.SlideLeftAppear,
    appearActive: classes.SlideLeftAppearActive,
    enter: classes.SlideLeftEnter,
    enterActive: classes.SlideLeftEnterActive,
    exit: classes.SlideLeftExit,
    exitActive: classes.slideLeftExitActive
  }

  const slideRightClasses = {
    appear: classes.SlideRightAppear,
    appearActive: classes.SlideRightAppearActive,
    enter: classes.SlideRightEnter,
    enterActive: classes.SlideRightEnterActive,
    exit: classes.SlideRightExit,
    exitActive: classes.SlideRightExitActive
  }

  let classNames = null;

  if (props.animation === 'fade') {
    classNames = fadeClasses;
  } else if (props.animation === 'slideLeft') {
    classNames = slideLeftClasses;
  } else if (props.animation === 'slideRight') {
    classNames = slideRightClasses;
  }

  let wrapper = (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={true}
      appear={true}
      key={props.assignedKey}
      classNames={classNames ? {
        appear: classNames.appear,
        appearActive: classNames.appearActive,
        enter: classNames.enter,
        enterActive: classNames.enterActive,
        exit: classNames.exit,
        exitActive: classNames.exitActive
      } : '' }
      timeout={props.timeout}>
        <div>
          {props.children}
        </div>
    </CSSTransition>
  )


  if (props.multiple) {
    wrapper = (
      <TransitionGroup>
        {wrapper}
      </TransitionGroup>
    )
  }

  return wrapper
}

export default TransitionElement