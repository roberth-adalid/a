import sgy from 'slugify';

export default function slugify(
  string: string,
  options = { lower: true, remove: /[*+~.()'"!:@]/g }
) {
  return sgy(string, options);
}
