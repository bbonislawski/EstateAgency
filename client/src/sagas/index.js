import {
  watchGetEstates,
  watchDeleteEstate,
  watchPostEstate
} from './estates';
import { watchUploadPicture } from './filestack';
import { watchLoginUser, watchSignupUser } from './auth';

export default function* rootSaga () {
  yield [
    watchGetEstates(),
    watchDeleteEstate(),
    watchPostEstate(),
    watchUploadPicture(),
    watchLoginUser(),
    watchSignupUser()
  ];
}
