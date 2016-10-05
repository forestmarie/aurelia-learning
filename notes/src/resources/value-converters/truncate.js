export class TruncateValueConverter {
  toView(value, maxLength) {
    if (value.length >  maxLength) {
      return value.substring(0,  maxLength) + '...';
    }

    return value;
  }
}
