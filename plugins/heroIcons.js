//plugin./heroIcons
import { defineNuxtPlugin } from '#app'
import {
  ArrowUpCircleIcon,
  ArrowUpOnSquareIcon,
  AtSymbolIcon,
  Bars3Icon,
  CalendarIcon,
  CameraIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  EyeIcon,
  IdentificationIcon,
  HeartIcon,
  MinusCircleIcon,
  MoonIcon,
  PaperClipIcon,
  PencilIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  QrCodeIcon,
  RocketLaunchIcon,
  SunIcon,
  SparklesIcon,
  UserCircleIcon,
  XCircleIcon,
  XMarkIcon,
  CakeIcon,
} from '@heroicons/vue/24/solid'

export default defineNuxtPlugin((nuxtApp) => {
  const icons = {
    ArrowUpCircleIcon,
    ArrowUpOnSquareIcon,
    AtSymbolIcon,
    Bars3Icon,
    CalendarIcon,
    CameraIcon,
    ChatBubbleLeftRightIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    ChevronUpIcon,
    DevicePhoneMobileIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    EyeIcon,
    HeartIcon,
    IdentificationIcon,
    MinusCircleIcon,
    MoonIcon,
    PaperClipIcon,
    PencilIcon,
    PencilSquareIcon,
    PlusCircleIcon,
    QrCodeIcon,
    RocketLaunchIcon,
    SunIcon,
    SparklesIcon,
    UserCircleIcon,
    XCircleIcon,
    XMarkIcon,
    CakeIcon,
  }

  Object.entries(icons).forEach(([name, component]) => {
    if (!nuxtApp.vueApp.component(name)) {
      nuxtApp.vueApp.component(name, component)
    }
  })
})
